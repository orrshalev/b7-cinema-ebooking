import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const movieRouter = createTRPCRouter({
  getCard: publicProcedure
    .input(
      z.object({ userID: z.string() })
    )
    .query(async ({ input, ctx }) => {
      const cardList = await ctx.prisma.card.findMany({ 
        where: {
            userId: input.userID,
        }
       });
      return cardList;
    }),
});
