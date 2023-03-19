import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const movieRouter = createTRPCRouter({
  getAddress: publicProcedure
    .input(
      z.object({ userID: z.string() })
    )
    .query(async ({ input, ctx }) => {
      const addressList = await ctx.prisma.address.findMany({ 
        where: {
            userId: input.userID,
        }
       });
      return addressList;
    }),
});
