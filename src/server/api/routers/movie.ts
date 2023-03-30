import { title } from "process";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const movieRouter = createTRPCRouter({
  getMovies: publicProcedure
    .input(
      z.object({ limit: z.number(), comingSoon: z.boolean(), date: z.date() })
    )
    .query(async ({ input, ctx }) => {
      const moviesList = await ctx.prisma.movie.findMany({ take: input.limit });
      return moviesList;
    }),

    getAllMovies: publicProcedure
    .query(async ({ ctx }) => {
      const allMoviesList = await ctx.prisma.movie.findMany();
      return allMoviesList;
    }),

    removeMovie: publicProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const movieFound = await ctx.prisma.movie.findFirst({
        where: { title: input.title },
      });
      if (movieFound){
        await ctx.prisma.movie.delete({
          where: {
            id: movieFound.id,
          },
        })
      }
    }),  

    updateMovie: publicProcedure
    .input(
      z.object({
        beforeTitle: z.string(),
        afterTitle: z.string(),
        rating: z.string(),
        genres: z.array(z.string()),
        poster: z.string(),
        trailer: z.string(),
        length: z.number(),
        // synopsis: z.string(),
        // cast: z.array(z.string()),
        // directors: z.array(z.string()),
        // producers: z.array(z.string()),
        // reviews: z.array(z.string())
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
          genres: input.genres,
          trailer: input.trailer,
          poster: input.poster,
          length: input.length,
          // synopsis: input.synopsis,
          // cast: input.cast,
          // directors: input.directors,
          // producers: input.producers,
          // reviews: input.reviews
        },
      });
    }),

    deleteShowTime: publicProcedure
    .input(
      z.object({
        title: z.string(),
        showtimes: z.array(z.date())
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
        data: { showtimes: input.showtimes }
      });
    }),

    addShowTime: publicProcedure
    .input(
      z.object({
        title: z.string(),
        newShowtime: z.date()
      })
    )
    .mutation(async ({ input, ctx }) => {
      const findTime = await ctx.prisma.movie.findFirst({
        where: {
          showtimes: {
            has: input.newShowtime,
          },
        },
      })
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
              push: input.newShowtime
            }
          }
        });
      }
      return true;
    }),
});