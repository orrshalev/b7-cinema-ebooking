import { title } from "process";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const movieRouter = createTRPCRouter({
  getUpcomingMovies: publicProcedure
    .input(z.object({ limit: z.number(), comingSoon: z.boolean() }))
    .query(async ({ input, ctx }) => {
      const moviesList = await ctx.prisma.movie.findMany({
        where: {
          upcoming: input.comingSoon,
        },
        take: input.limit,
      });
      return moviesList;
    }),
  addmovie: publicProcedure
    .input(
      z.object({
        title: z.string(),
        synopsis: z.string(),
        rating: z.string(),
        genre: z.string(),
        upcoming: z.boolean(),
        showtimes: z.array(z.string()),
        poster: z.string(),
        trailer: z.string(),
        length: z.string(),
        cast: z.string(),
        directors: z.string(),
        producers: z.string(),
        reviews: z.array(z.string()),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const movie = await ctx.prisma.movie.create({
        data: {
          title: input.title,
          synopsis: input.synopsis,
          rating: input.rating,
          upcoming: input.upcoming,
          genre: input.genre,
          showtimes: [],
          poster: input.poster,
          trailer: input.trailer,
          length: input.length,
          cast: input.cast,
          directors: input.directors,
          producers: input.producers,
          reviews: [],
        },
      });
      return movie;
    }),

  getTodayMovies: publicProcedure
    .input(
      z.object({
        limit: z.number(),
        range: z.array(z.date()),
        comingSoon: z.boolean(),
      })
    )
    .query(async ({ input, ctx }) => {
      const moviesList = await ctx.prisma.movie.findMany({
        where: {
          showtimes: {
            hasSome: input.range,
          },
          upcoming: input.comingSoon,
        },
        take: input.limit,
      });
      return moviesList;
    }),

  getAllMovies: publicProcedure.query(async ({ ctx }) => {
    const allMoviesList = await ctx.prisma.movie.findMany();
    return allMoviesList;
  }),

  getMovieByDate: publicProcedure
    .input(z.object({ day: z.number(), title: z.string() }))
    .query(async ({ input, ctx }) => {
      const moviesListOnDay = [];
      const allMoviesList = await ctx.prisma.movie.findMany();
      allMoviesList.forEach((movie) => {
        for (let i = 0; i < movie.showtimes.length; i++) {
          if (movie.showtimes[i].getDay() == input.day) {
            moviesListOnDay.push(movie);
            i = movie.showtimes.length;
          }
        }
      });
      moviesListOnDay.forEach((movie) => {
        const relevantShowtimes = [];
        movie.showtimes.forEach((showtime) => {
          if (showtime.getDay() == input.day) {
            relevantShowtimes.push(showtime);
          }
        });
        movie.showtimes = relevantShowtimes;
      });
      return moviesListOnDay;
    }),

  removeMovie: publicProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const movieFound = await ctx.prisma.movie.findFirst({
        where: { title: input.title },
      });
      if (movieFound) {
        await ctx.prisma.movie.delete({
          where: {
            id: movieFound.id,
          },
        });
      }
    }),

  updateMovie: publicProcedure
    .input(
      z.object({
        beforeTitle: z.string(),
        afterTitle: z.string(),
        rating: z.string(),
        genre: z.string(),
        poster: z.string(),
        trailer: z.string(),
        length: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const movie = await ctx.prisma.movie.findFirst({
        where: {
          title: input.beforeTitle,
        },
      });
      await ctx.prisma.movie.update({
        where: { id: movie?.id },
        data: {
          title: input.afterTitle,
          rating: input.rating,
          genre: input.genre,
          trailer: input.trailer,
          poster: input.poster,
          length: input.length,
        },
      });
    }),

  deleteShowTime: publicProcedure
    .input(
      z.object({
        title: z.string(),
        showtimes: z.array(z.date()),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const movie = await ctx.prisma.movie.findFirst({
        where: {
          title: input.title,
        },
      });
      await ctx.prisma.movie.update({
        where: { id: movie?.id },
        data: { showtimes: input.showtimes },
      });
    }),

  addShowTime: publicProcedure
    .input(
      z.object({
        title: z.string(),
        newShowtime: z.date(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const findTime = await ctx.prisma.movie.findFirst({
        where: {
          showtimes: {
            has: input.newShowtime,
          },
        },
      });
      if (findTime) return false;
      else {
        const movie = await ctx.prisma.movie.findFirst({
          where: {
            title: input.title,
          },
        });
        await ctx.prisma.movie.update({
          where: { id: movie?.id },
          data: {
            showtimes: {
              push: input.newShowtime,
            },
          },
        });
      }
      return true;
    }),

  searchMovieTitle: publicProcedure
    .input(
      z.object({
        search: z.string(), // has to be correct spelling
      })
    )
    .query(async ({ input, ctx }) => {
      const moviesList = await ctx.prisma.movie.findMany();
      const searchResults = [];
      moviesList.every((movie) => {
        if (movie.title.toLowerCase() === input.search.toLowerCase()) {
          searchResults.push(movie);
          return false;
        }
      });
      return searchResults;
    }),

  searchMovieCategory: publicProcedure
    .input(
      z.object({
        search: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const moviesList = await ctx.prisma.movie.findMany({
        where: {
          genre: {
            contains: input.search,
          },
        },
      });
      return moviesList;
    }),

  searchMovieDate: publicProcedure
    .input(
      z.object({
        searchDate: z.string(), // format: YYYY-MM-DD
      })
    )
    .query(async ({ input, ctx }) => {
      const moviesList = await ctx.prisma.movie.findMany();
      const searchResults = [];
      moviesList.every((movie) => {
        movie.showtimes.every((showtime) => {
          const dateTimeInParts = showtime.toISOString().split("T");
          const dateOnly = dateTimeInParts[0];
          if (dateOnly === input.searchDate) {
            searchResults.push(movie);
            return false;
          }
        });
      });
      return searchResults;
    }),

  filterComingSoon: publicProcedure
    .input(
      z.object({
        isComingSoon: z.boolean(),
      })
    )
    .query(async ({ input, ctx }) => {
      const moviesList = await ctx.prisma.movie.findMany({
        where: {
          upcoming: input.isComingSoon,
        },
      });
      return moviesList;
    }),
});
