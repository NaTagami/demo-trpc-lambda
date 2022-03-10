import * as express from 'express';

import * as trpc from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { z, ZodError } from 'zod';
import { UserName } from '@trpc-lambda-demo/common';

export const appRouter = trpc
  .router()
  .query('hello', {
    input: z.object({
      name: UserName,
    }),
    async resolve(req) {
      return { message: `Hello ${req.input.name}` };
    },
  })
  .formatError(({ shape, error }) => {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
            ? error.cause.flatten()
            : null,
      },
    };
  });

// export type definition of API
export type AppRouter = typeof appRouter;

export const app = express.default();

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  return { req, res };
};

type Context = trpc.inferAsyncReturnType<typeof createContext>;

app.use(
  '/',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);
