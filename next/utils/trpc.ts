import { createReactQueryHooks } from '@trpc/react';
import type { AppRouter } from '@sample-monorepo/server';

export const trpc = createReactQueryHooks<AppRouter>();
