import { createReactQueryHooks } from '@trpc/react';
import type { AppRouter } from '@trpc-lambda-demo/server';

export const trpc = createReactQueryHooks<AppRouter>();
