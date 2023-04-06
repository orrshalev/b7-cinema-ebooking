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

  getAllMovies: publicProcedure
  .query(async ({ ctx }) => {
    const allMoviesList = await ctx.prisma.movie.findMany();
    return allMoviesList;
  }),

  getMovieByDate: publicProcedure
  .input(z.object({ day: z.number() }))
  .query(async ({ input, ctx }) => {
    let moviesListOnDay = []
    const allMoviesList = await ctx.prisma.movie.findMany();
    allMoviesList.forEach((movie) => {
      movie.showtimes.every((showtime) => {
        if (showtime.getDay() == input.day) {
          moviesListOnDay.push(movie)
          return false;
        }
      })
    })
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
        synopsis: z.string(),
        cast: z.string(),
        directors: z.string(),
        producers: z.string(),
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
          synopsis: input.synopsis,
          cast: input.cast,
          directors: input.directors,
          producers: input.producers,
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
});
