import { z } from "zod";
import nodemailer from "nodemailer";

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
                order: { connect: { id: order.id} },
            },
        });
        try {
            const transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
              },
            });
            const x = input.adult + input.senior + input.children
            const mailConfigurations = {
              from: process.env.EMAIL_USER,
              to: addOrder.email,
              subject: "Cinema E-Booking: Ticket Confirmation",
              text:
                "This email is to confirm your order of " + 
                x + " tickets for: " + input.title +
                " at " + input.showtime + " for a total of " +
                input.total.toFixed(2) + " dollars.",
            };
  
            await transporter.sendMail(mailConfigurations);
          } catch (error) {
            console.error(error);
          }
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
