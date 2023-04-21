import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const seatRouter = createTRPCRouter({
  bookSeat: publicProcedure
    .input(z.object({
      seat: z.string(),
      movie: z.string(),
      showtime: z.date()
    }))
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.seat.create({
        data: {
          seat: input.seat,
          movie: input.movie,
          showtime: input.showtime
        }
    });
  }),

  getBookedSeats: publicProcedure
    .input(z.object({
      movie: z.string(),
      showtime: z.date()
    }))
    .query(async ({ input, ctx }) => {
      const bookedSeats = await ctx.prisma.seat.findMany({
        where: {
          movie: input.movie,
          showtime: input.showtime
        },
    });
    if (!bookedSeats) return false;
    return bookedSeats;
  }),
});