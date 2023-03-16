import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getMovies: publicProcedure
    .input(
      z.object({ email: z.string() })
    )
    .query(async ({ input, ctx }) => {
      const findUser = await ctx.prisma.user.findMany({ take: 1 });
      return findUser;
    }),
});