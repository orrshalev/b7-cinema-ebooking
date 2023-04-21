import { z } from "zod";
import nodemailer from "nodemailer";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const promotionRouter = createTRPCRouter({
    createPromotion: publicProcedure
    .input(
        z.object({
            movieTitle: z.string(),
            code: z.string(),
            discount: z.number(),
        })
    )
    .mutation(async ({ input, ctx }) => {
        const movie = await ctx.prisma.movie.findFirst({
            where : { title: input.movieTitle },
        });
        const promotion = await ctx.prisma.promotion.create({
            data: {
                code: input.code,
                discount: input.discount,
                movie: { connect: { id: movie.id } },
            },
        });
        const trueMovie = await ctx.prisma.movie.update({
            where: 
            { id: movie.id, 
            },
            data: {
                promotion: { connect: { id: promotion.id } },
            },
        });
        const users = await ctx.prisma.user.findMany({
            where: {
                agreeToPromo: true
            }
        }
        );
        for (const user of users) {
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
                    to: user.email,
                    subject: "Cinema E-Booking: Promotion Code!",
                    text:
                      "Use promotion code: \"" +
                      promotion.code +
                      "\" to get $" + promotion.discount + " off on tickets for " + trueMovie.title + "!",
                  };
            await transporter.sendMail(mailConfigurations);
          } catch (error) {
            console.error(error);
          }
        }
    }),
    getPromotions: publicProcedure
    .input(
        z.object({
            movieTitle: z.string(),
        })
    )
    .query(async ({ input, ctx }) => {
        const movie = await ctx.prisma.movie.findFirst({
            where: { title: input.movieTitle },
        });
        const promotion = await ctx.prisma.promotion.findMany({
            where: { movieId: movie.id },
        });
        return promotion;
    }),
    getPromotionByCode: publicProcedure
    .input(
        z.object({
            code: z.string(),
            title: z.string()
        })
    )
    .query(async ({ input, ctx }) => {
        const promotion = await ctx.prisma.promotion.findFirst({
            where: { code: input.code, title: input.title },
        });
        if (!promotion) return 0;
        return promotion.discount;
    }),

});
