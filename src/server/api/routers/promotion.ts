import { z } from "zod";
import nodemailer from "nodemailer";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const promotionRouter = createTRPCRouter({
    createPromotion: publicProcedure
    .input(
        z.object({
            movieID: z.string(),
            discount: z.number(),
        })
    )
    .mutation(async ({ input, ctx }) => {
        const promotion = await ctx.prisma.promotion.create({
            data: {
                code: (Math.random() + 1).toString(36).substring(6),
                discount: input.discount,
                movie: { connect: { id: input.movieID } },
            },
        });
        const addPromo = await ctx.prisma.movie.update({
            where: 
            { id: input.movieID, 
            },
            data: {
                promotion: { connect: { id: promotion.id } },
            },
        });
        return promotion;
    }),
    getPromotion: publicProcedure
    .input(
        z.object({
            email: z.string(),
            code: z.string(),
            discount: z.number(),
        })
    )
    .mutation(async ({ input, ctx }) => {
        const promotion = await ctx.prisma.promotion.findFirst({
            where: { code: input.code },
        });
        const movie = await ctx.prisma.movie.findFirst({
            where: { id: promotion.movieId },
        });
        try {
            const transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
              },
            });
            const mailConfigurations = {
                from: process.env.EMAIL_USER,
                to: input.email,
                subject: "Cinema E-Booking: Promotion Code!",
                text:
                  "Use Promotion code: " +
                  input.code +
                  "to get " + input.discount + "dollars off on tickets for " + movie.title + "!",
              };
        await transporter.sendMail(mailConfigurations);
      } catch (error) {
        console.error(error);
      }
        return true;
    }),

});