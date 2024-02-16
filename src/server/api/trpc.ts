// import * as trpcNext from '@trpc/server/adapters/next'
import { getAuth } from '@clerk/nextjs/server'
// import type { SignedInAuthObject, SignedOutAuthObject } from "@clerk/nextjs/server";
import type { NextApiRequest } from 'next';
import { db } from '~/database/db';
import { users } from '~/database/schema';
import { eq } from 'drizzle-orm';

// interface AuthContextProps {
//   auth: SignedInAuthObject | SignedOutAuthObject;
// }


/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 */
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";

/** Replace this with an object if you want to pass things to `createContextInner`. */
// type CreateContextOptions = Record<string, never>;

/**
 * This helper generates the "internals" for a tRPC context. If you need to use it, you can export
 * it from here.
 *
 * Examples of things you may need it for:
 * - testing, so we don't have to mock Next.js' req/res
 * - tRPC's `createSSGHelpers`, where we don't have req/res
 *
 * @see https://create.t3.gg/en/usage/trpc#-servertrpccontextts
 */
const createInnerTRPCContext = (req: NextApiRequest) => {
  const currentUser = getAuth(req)
  console.log(currentUser)
  return { currentUser };
};

/**
 * This is the actual context you will use in your router. It will be used to process every request
 * that goes through your tRPC endpoint.
 *
 * @see https://trpc.io/docs/context
 */
export const createTRPCContext = (opts: CreateNextContextOptions) => {
  const { req } = opts
  return createInnerTRPCContext(req);
};

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer.
 */
import { TRPCError, initTRPC } from "@trpc/server";
import superjson from "superjson";

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure;

export const enforceUserIsAuthed = t.middleware(async ({ ctx, next }) => {

  if (!ctx.currentUser) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    })
  }

  return next({
    ctx: {
      currentUser: ctx.currentUser
    }
  })

})

export const privateProcedure = t.procedure.use(enforceUserIsAuthed)

export const enforceTutorRole = t.middleware(async ({ ctx, next }) => {

  // console.log(ctx.currentUser)

  ctx.currentUser

  const userId = ctx.currentUser.userId as string
  const userQueryResult = await db.select().from(users).where(eq(users.id, userId))
  const userRole = userQueryResult[0]?.role

  if (userRole !== 'tutor') {

    throw new TRPCError({
      code: "UNAUTHORIZED"
    })
  }

  return next({ ctx })

})

enforceTutorRole.unstable_pipe(enforceUserIsAuthed)
export const privateTutorProcedure = t.procedure.use(enforceTutorRole)
