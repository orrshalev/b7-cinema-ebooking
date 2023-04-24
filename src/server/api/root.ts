import { createTRPCRouter } from "~/server/api/trpc";
import { movieRouter } from "~/server/api/routers/movie";
import { userRouter } from "~/server/api/routers/user";
import { cardRouter } from "~/server/api/routers/card";
import { addressRouter } from "~/server/api/routers/address";
import { promotionRouter } from "~/server/api/routers/promotion";
import { seatRouter } from "~/server/api/routers/seat";
import { orderRouter } from "~/server/api/routers/order";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  movie: movieRouter,
  user: userRouter,
  card: cardRouter,
  address: addressRouter,
  promotion: promotionRouter,
  order: orderRouter,
  seat: seatRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
