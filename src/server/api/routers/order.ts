import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const orderRouter = createTRPCRouter({
    addOrder: publicProcedure
    .input(
        z.object({
            userId: z.string(),
            title: z.string(),
            seats: z.string().array(),
            adult: z.number(),
            children: z.number(),
            senior: z.number(),
            promo: z.number(),
            total: z.number(),
            showtime: z.date()
        })
    )
    .mutation(async ({ input, ctx }) => {
        const order = await ctx.prisma.order.create({
        data: {
            user: { connect: { id: input.userId } },
            bookingNo: Math.floor(100000 + Math.random() * 900000).toString(),
            title: input.title,
            seats: input.seats,
            aTicket: input.adult,
            cTicket: input.children,
            sTicket: input.senior,
            promoAmount: input.promo,
            total: input.total,
            showtime: input.showtime
        },
        });
        const addOrder = await ctx.prisma.user.update({
            where: {
                id: input.userId,
            },
            data: {
                card: { connect: { id: order.id} },
            },
        });
        return order;
    }),
    getOrders: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input, ctx }) => {
      const orderList = await ctx.prisma.order.findMany({
        where: {
          userId: input.userId,
        },
      });
      return orderList;
    }),
})
