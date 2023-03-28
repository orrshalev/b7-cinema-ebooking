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
});
