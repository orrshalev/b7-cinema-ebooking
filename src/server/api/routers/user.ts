/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(
      z.object({
        email: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        phoneNumber: z.string(),
        password: z.string(),
        homeAddress: z.string(),
        cardNumber: z.string(),
        billAddress: z.string(),
        cvv: z.string(),
        state: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.create({
        data: {
          email: input.email,
          firstName: input.firstName,
          lastName: input.lastName,
          phoneNumber: input.phoneNumber,
          password: input.password,
          homeAddress: input.homeAddress,
          cardNumber: input.cardNumber,
          billAddress: input.billAddress,
          cvv: input.cvv,
          state: input.state,
        },
      });
      return user;
    }),
});
