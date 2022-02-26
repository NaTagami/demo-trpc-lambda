import * as express from 'express';

import * as trpc from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { z, ZodError } from 'zod';

export const appRouter = trpc
  .router()
  .query('hello', {
    input: z.object({
      name: z.string(),
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
  }); /*
  .mutation('createUser', {
    // validate input with Zod
    input: z.object({ name: z.string().min(5) }),
    async resolve(req) {
      // use your ORM of choice
      return await UserModel.create({
        data: req.input,
      });
    },
  });*/

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
/*
app.use((req: any, _res: any, next: any) => {
  // request logger
  console.log('⬅️ ', req.method, req.path, req.body ?? req.query);

  next();
});
*/
app.use(
  '/',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

/*
const router = express.Router();

router.get('/hello', (req, res) => {
  res.json({ message: 'Hello World!' });
});

router.get('/users', (req, res) => {
  res.json([{ name: 'Taro' }, { name: 'Hanako' }]);
});
app.use('/', router);
*/
