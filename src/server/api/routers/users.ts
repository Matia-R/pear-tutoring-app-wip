import { z } from "zod";
import { db } from "~/database/db";
import { type InferModel, eq } from "drizzle-orm";
import { users } from "~/database/schema"
import { clerkClient } from "@clerk/nextjs";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const usersRouter = createTRPCRouter({
    getUserRole: publicProcedure
        .query(async ({ ctx }) => {
            const userId = ctx.currentUser.userId as string
            const userQueryResult = await db.select().from(users).where(eq(users.id, userId))
            const role = userQueryResult[0]?.role
            return { role }
        }),
    createUser: publicProcedure
        .input(z.object({
            userId: z.string(),
            role: z.string(),
            firstName: z.string(),
            lastName: z.string(),
            email: z.string(),
        }))
        .mutation(async ({ input }) => {

            type NewUser = InferModel<typeof users, "insert">
            const insertUser = async (user: NewUser) => {
                return (await db.insert(users).values(user)).statement
            }
            const newUser: NewUser = {
                id: input.userId,
                role: input.role,
                firstName: input.firstName,
                lastName: input.lastName,
                emailAddress: input.email
            }

            const createdUser = await insertUser(newUser)

            return {
                user: `Created new user: ${createdUser}`,
            };
        }),
    deleteClerkUser: publicProcedure
        .input(z.object({
            userId: z.string(),
        }))
        .mutation(async ({ input }) => {
            try {
                await clerkClient.users.deleteUser(input.userId);
            }
            catch (error) {
                console.log(error);
            }
        })
});
