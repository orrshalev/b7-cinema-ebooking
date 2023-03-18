import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

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
          confirmed: false,
          confirmCode: (Math.random() + 1).toString(36).substring(6),
        },
      });
      return user;
    }),
  confirmUser: publicProcedure
    .input(z.object({ email: z.string(), confirmCode: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findFirst({
        where: { email: input.email },
      });
      if (user && user.confirmCode == input.confirmCode) {
        await ctx.prisma.user.update({
          where: { email: input.email },
          data: { confirmed: true },
        });
        return true;
      }
      return false;
    }),
  getLoggedInUser: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        email: ctx.session.user.email,
      },
    });
    return user;
  }),
});
