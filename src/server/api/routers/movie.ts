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
    addmovie: publicProcedure.input(
      z.object({
        title: z.string(),
        synopsis: z.string(),
        rating: z.string(),
        genre: z.string(),
        showtimes: z.array(z.string()),
        poster: z.string(),
        trailer: z.string(),
        length: z.string(),
        cast: z.string(),
        directors: z.string(),
        producers : z.string(),
        reviews : z.array(z.string()),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const movie = await ctx.prisma.movie.create({
        data: {
          title: input.title,
          synopsis: input.synopsis,
          rating: input.rating,
          genre: input.genre,
          showtimes: input.showtimes,
          poster: input.poster,
          trailer: input.trailer,
          length: input.length,
          cast: input.cast,
          directors: input.directors,
          producers: input.producers,
          reviews: input.reviews,
        },
      });
      return movie;
    }),
});
