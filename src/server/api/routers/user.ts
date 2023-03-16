import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getMovies: publicProcedure
    .input(
      z.object({ limit: z.number(), comingSoon: z.boolean(), date: z.date() })
    )
    .query(async ({ input, ctx }) => {
      const moviesList = await ctx.prisma.user.findMany({ take: 1 });
      return moviesList;
    }),
});