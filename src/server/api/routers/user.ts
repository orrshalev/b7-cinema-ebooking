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
        homeCity: z.string(),
        homeState: z.string(),
        homeZip: z.string(),
        cardNumber: z.string(),
        billAddress: z.string(),
        billCity: z.string(),
        billState: z.string(),
        billZip: z.string(),
        cardType: z.string(),
        billMonth: z.string(),
        billYear: z.string(),
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
          // homeAddress: {connect: { id: address.id }},
          state: input.state,
          confirmed: false,
          confirmCode: (Math.random() + 1).toString(36).substring(6),
        },
      });
      if (input.homeAddress) {
        const address = await ctx.prisma.address.create({
          data: {
            firstName: input.firstName,
            lastName: input.lastName,
            address: input.homeAddress,
            city: input.homeCity,
            state: input.homeState,
            zip: input.homeZip,
            user: { connect: { id: user.id } },
          },
        });
        const addAdddress = await ctx.prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            homeAddress: { connect: { id: address.id } },
          },
        });
      }
      if (input.cardNumber) {
        const card = await ctx.prisma.card.create({
          data: {
            cardNumber: input.cardNumber,
            firstName: input.firstName,
            lastName: input.lastName,
            address: input.billAddress,
            city: input.billCity,
            state: input.billState,
            zip: input.billZip,
            expMonth: input.billMonth,
            expYear: input.billYear,
            cvv: input.cvv,
            user: { connect: { id: user.id } },
          },
        });
        const addCard = await ctx.prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            card: { connect: { id: card.id } },
          },
        });
      }
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
});
