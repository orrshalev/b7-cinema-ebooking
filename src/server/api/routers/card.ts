import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const cardRouter = createTRPCRouter({
  //RETURNS A LIST OF CARDS
  //INPUT: USER ID
  getCards: publicProcedure
    .input(z.object({ userID: z.string() }))
    .query(async ({ input, ctx }) => {
      const cardList = await ctx.prisma.card.findMany({
        where: {
          userId: input.userID,
        },
      });
      return cardList;
    }),
  //REMOVES A CARD
  //INPUT: USER ID, CARD NUMBER
  //RETURNS REMOVED CARD
  //So, this is kinda bodgy, because we *have* to use deleteMany here.
  //The only problem this causes is that if a user has multiple cards with the same number, it will delete all of them.
  //But that's unlikely and beyond the scope of our project lol.
  removeCard: publicProcedure
    .input(z.object({ userID: z.string(), cardNumber: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const removedCount = await ctx.prisma.card.deleteMany({
        where: {
          cardNumber: input.cardNumber,
          userId: input.userID,
        },
      });
      return removedCount;
    }),
  //ADD A CARD
  //INPUT: USER ID, CARD NUMBER, FIRST NAME, LAST NAME, BILLING ADDRESS, BILLING CITY, BILLING STATE, BILLING ZIP, CARD TYPE, EXPIRATION MONTH, EXPIRATION YEAR, CVV
  //RETURNS NEW CARD
  addCard: publicProcedure
    .input(
      z.object({
        userID: z.string(),
        cardNumber: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        billAddress: z.string(),
        billCity: z.string(),
        billState: z.string(),
        billZip: z.string(),
        cardType: z.string(),
        billMonth: z.string(),
        billYear: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const card = await ctx.prisma.card.create({
        data: {
          cardNumber: input.cardNumber,
          firstName: input.firstName,
          lastName: input.lastName,
          street: input.billAddress,
          city: input.billCity,
          state: input.billState,
          zip: input.billZip,
          expMonth: input.billMonth,
          expYear: input.billYear,
          user: { connect: { id: input.userID } },
        },
      });
      const addCard = await ctx.prisma.user.update({
        where: {
          id: input.userID,
        },
        data: {
          card: { connect: { id: card.id } },
        },
      });
      return card;
    }),
});
