import { z } from "zod";
import { exit } from "process";
import nodemailer from "nodemailer";

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
        homeStreet: z.string().optional(),
        homeCity: z.string().optional(),
        homeState: z.string().optional(),
        homeZip: z.string().optional(),
        cardNumber: z.string().optional(),
        billStreet: z.string().optional(),
        billCity: z.string().optional(),
        billState: z.string().optional(),
        billZip: z.string().optional(),
        cardType: z.string().optional(),
        billMonth: z.string().optional(),
        billYear: z.string().optional(),
        state: z.string(),
        agreeToPromo: z.boolean(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const test = await ctx.prisma.user.count({
        where: { email: input.email },
      });
      if (test > 0) {
        return null;
      } else {
        const user = await ctx.prisma.user.create({
          data: {
            email: input.email,
            firstName: input.firstName,
            lastName: input.lastName,
            phoneNumber: input.phoneNumber,
            password: input.password,
            // homeAddress: {connect: { id: address.id }},
            agreeToPromo: input.agreeToPromo,
            state: input.state,
            confirmed: false,
            confirmCode: (Math.random() + 1).toString(36).substring(6),
          },
        });
        if (input.homeStreet) {
          const address = await ctx.prisma.address.create({
            data: {
              firstName: input.firstName,
              lastName: input.lastName,
              street: input.homeStreet,
              city: input.homeCity,
              state: input.homeState,
              zip: input.homeZip,
              user: { connect: { id: user.id } },
            },
          });
          const addAddress = await ctx.prisma.user.update({
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
              street: input.billStreet,
              city: input.billCity,
              state: input.billState,
              zip: input.billZip,
              expMonth: input.billMonth,
              expYear: input.billYear,
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
            subject: "Cinema E-Booking: Register Confirmation",
            text:
              "Here is the code to register your account: " +
              user.confirmCode +
              "\nDO NOT share this code with anyone.",
          };

          await transporter.sendMail(mailConfigurations);
        } catch (error) {
          console.error(error);
        }
        return user;
      }
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
  getUser: publicProcedure
    .input(z.object({ email: z.string() }))
    .query(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findFirst({
        where: {
          email: input.email,
        },
      });
      return user;
    }),
  updateUser: publicProcedure
    .input(
      z.object({
        email: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        phoneNumber: z.string(),
        homeStreet: z.string().optional(),
        homeCity: z.string().optional(),
        homeState: z.string().optional(),
        homeZip: z.string().optional(),
        agreeToPromo: z.boolean(),
        state: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.update({
        where: { email: input.email },
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          phoneNumber: input.phoneNumber,
          agreeToPromo: input.agreeToPromo,
        },
      });
      const test = await ctx.prisma.address.count({
        where: { userId: user.id },
      });
      if (test == 0) {
        if (input.homeStreet) {
          const address = await ctx.prisma.address.create({
            data: {
              firstName: input.firstName,
              lastName: input.lastName,
              street: input.homeStreet,
              city: input.homeCity,
              state: input.homeState,
              zip: input.homeZip,
              user: { connect: { id: user.id } },
            },
          });
          const addAddress = await ctx.prisma.user.update({
            where: {
              id: user.id,
            },
            data: {
              homeAddress: { connect: { id: address.id } },
            },
          });
        }
      } else {
        const address = await ctx.prisma.address.update({
          where: { userId: user.id },
          data: {
            firstName: input.firstName,
            lastName: input.lastName,
            street: input.homeStreet,
            city: input.homeCity,
            state: input.homeState,
            zip: input.homeZip,
          },
        });
      }
      return user;
    }),
  updateCard: publicProcedure
    .input(
      z.object({
        email: z.string(),
        cardNumber: z.string(),
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
      const user = await ctx.prisma.user.findFirst({
        where: {
          email: input.email,
        },
      });
      if (user != null) {
        const test = await ctx.prisma.card.count({
          where: { cardNumber: input.cardNumber },
        });
        if (test == 1) {
          const card = await ctx.prisma.card.update({
            where: { cardNumber: input.cardNumber },
            data: {
              cardNumber: input.cardNumber,
              firstName: user.firstName,
              lastName: user.lastName,
              street: input.billAddress,
              city: input.billCity,
              state: input.billState,
              zip: input.billZip,
              expMonth: input.billMonth,
              expYear: input.billYear,
            },
          });
          return card;
        } else {
          const card = await ctx.prisma.card.create({
            data: {
              cardNumber: input.cardNumber,
              firstName: user.firstName,
              lastName: user.lastName,
              street: input.billAddress,
              city: input.billCity,
              state: input.billState,
              zip: input.billZip,
              expMonth: input.billMonth,
              expYear: input.billYear,
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
          return card;
        }
      }
    }),
  getallCards: publicProcedure
    .input(z.object({ email: z.string() }))
    .query(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findFirst({
        where: {
          email: input.email,
        },
      });
      if (user == null) {
        return null;
      }
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
          subject: "Cinema E-Booking: Register Confirmation",
          text:
            "Here is the code to register your account: " +
            user.confirmCode +
            "\nDO NOT share this code with anyone.",
        };

        await transporter.sendMail(mailConfigurations);
      } catch (error) {
        console.error(error);
      }
      const cards = await ctx.prisma.card.findMany({
        where: {
          userId: user.id,
        },
      });
      return cards;
    }),

  updateUserPwd: publicProcedure
    .input(
      z.object({
        id: z.string(),
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findFirst({
        where: { email: input.email },
      });
      if (user) {
        await ctx.prisma.user.update({
          where: { id: input.id },
          data: { password: input.password },
        });
      }
      return true;
    }),

  getUser: publicProcedure
    .input(z.object({ email: z.string() }))
    .query(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findFirst({
        where: {
          email: input.email,
        },
      });
      return user;
    }),

  getAllUserEmails: publicProcedure.query(async ({ ctx }) => {
    const allUsers = await ctx.prisma.user.findMany();
    const allUserEmails = allUsers.map((user) => user.email);
    return allUserEmails;
  }),

  confirmUserPwd: publicProcedure
    .input(z.object({ email: z.string(), changePwCode: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findFirst({
        where: { email: input.email },
      });
      if (user && user.changePwCode == input.changePwCode) {
        await ctx.prisma.user.update({
          where: { id: user.id },
          data: { changePwCode: "" },
        });
        return true;
      }
      return false;
    }),

  updatePw: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findFirst({
        where: { email: input.email },
      });
      if (user) {
        await ctx.prisma.user.update({
          where: { id: user.id },
          data: { password: input.password },
        });
        return true;
      }
      return false;
    }),

  isAdmin: publicProcedure
    .input(z.object({ email: z.string() }))
    .query(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findFirst({
        where: { email: input.email },
      });
      if (user.isAdmin == true) {
        return true;
      }
      return false;
    }),
});
