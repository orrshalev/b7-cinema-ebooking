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
        startTime: z.date(),
        endTime: z.date(),
        comingSoon: z.boolean(),
      })
    )
    .query(async ({ input, ctx }) => {
      const allMovies = await ctx.prisma.movie.findMany();
      let todayMovies = []
      allMovies.forEach((movie) => {
        movie.showtimes.every((showtime) => {
          if (showtime > input.startTime && showtime < input.endTime)
            todayMovies.push(movie);
        })
      })
      todayMovies = todayMovies.slice(0, 4);
      return todayMovies;
    }),

  getAllMoviesOnDay: publicProcedure
    .input(z.object({ day: z.number() }))
    .query(async ({ input, ctx }) => {
      const allMoviesList = await ctx.prisma.movie.findMany();
      allMoviesList.forEach((movie) => {
        const relevantShowtimes = []
        movie.showtimes.forEach ((showtime) => {
          if (showtime.getDay() == input.day) {
            relevantShowtimes.push(showtime)
          }        
        })
        movie.showtimes = relevantShowtimes
      })
      return allMoviesList;
    }),

  getAllMovies: publicProcedure
    .query(async ({ input, ctx }) => {
      const movies = await ctx.prisma.movie.findMany();
      return movies
    }),

  getMovie: publicProcedure
    .input(z.object({ title: z.string() }))
    .query(async ({ input, ctx }) => {
      const movie = await ctx.prisma.movie.findFirst({
        where: {
          title: input.title
        },
    });
      return movie;
    }),

  getMovieByDate: publicProcedure
    .input(z.object({ day: z.number() }))
    .query(async ({ input, ctx }) => {
      const allMoviesList = await ctx.prisma.movie.findMany();
      const moviesListOnDay: typeof allMoviesList = [];
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

  getAllShowTimes: publicProcedure
    .input(
      z.object({
        title: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const movie = await ctx.prisma.movie.findFirst({
        where: {
          title: input.title,
        },
      });
      return movie?.showtimes;
    }),

  deleteShowTime: publicProcedure
    .input(
      z.object({
        title: z.string(),
        // showtimes: z.array(z.date()),
        showtime: z.date(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const movie = await ctx.prisma.movie.findFirst({
        where: {
          title: input.title,
        },
      });
      const newShowtimes = [];
      movie?.showtimes.forEach((showtime) => {
        if (showtime > input.showtime || showtime < input.showtime) {
          // console.log("hello", showtime)
          newShowtimes.push(showtime);
        }
      });
      await ctx.prisma.movie.update({
        where: { id: movie?.id },
        data: { showtimes: newShowtimes },
      });
      return newShowtimes;
    }),

  addShowTime: publicProcedure
    .input(
      z.object({
        title: z.string(),
        newShowtime: z.date(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const movies = await ctx.prisma.movie.findMany();
      const startShowtime = []
      const endShowtime = []
      movies.forEach((movie) => {
        movie.showtimes.forEach((showtime) => 
        startShowtime.push(showtime))
      })
      movies.forEach((movie) => {
        movie.showtimes.forEach((showtime) => 
        endShowtime.push(showtime.getTime() + parseInt(movie.length, 10) * 60000))
      })
      // const startShowtime = movies.forEach((movie) => {
      //   movie.showtimes.map((showtime) => showtime);
      // });
      // const endShowtime = movies.forEach((movie) => {
      //   movie.showtimes.map((showtime) => showtime.getTime() + 60000);
      // });
      const findTime = await ctx.prisma.movie.findFirst({
        where: {
          showtimes: {
            has: input.newShowtime,
          },
        },
      });
      for (let i = 0; i < startShowtime.length; i++) {
        if (input.newShowtime > startShowtime[i] && input.newShowtime < endShowtime[i])
          return false;
      }
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
