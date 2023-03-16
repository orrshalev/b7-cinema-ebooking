import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
    createUser: publicProcedure
    .input(
        z.object({ email: z.string(), firstName: z.string(), lastName: z.string(), phoneNumber: z.string(),
        password: z.string(), homeAddress: z.string(), cardNumber: z.string(), billAddress: z.string(),
        cvv: z.string(), state: z.string()})
        )
        .query(async({input, ctx}) => { 
            ctx.prisma.

        }
})