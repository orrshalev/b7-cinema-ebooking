import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const addressRouter = createTRPCRouter({
  getAddress: publicProcedure
    .input(
      z.object({ userID: z.string() })
    )
    .query(async ({ input, ctx }) => {
      const addressList = await ctx.prisma.address.findFirst({ 
        where: {
            userId: input.userID,
        }
       });
      return addressList;
    }),
    ///////////////////////////////////////////////////////////////////////
    // so how this works is that you must provide user ID, every other field is optional (leave blank)
    // if any other field is provided, it will update that field
    // userId works here because there is only one home address per user
    updateAddress: publicProcedure
    .input(
      z.object({
        id: z.string(),
        homeAddress: z.string(),
        homeCity: z.string(),
        homeState: z.string(),
        homeZip: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      for (const [key, value] of Object.entries(input)) {
        if (value != "" && !(key === "id")) {
          await ctx.prisma.address.update({
            where: { userId: input.id },
            data: { [key]: value },
          });
        }
      }
      return true;
    }),
});
