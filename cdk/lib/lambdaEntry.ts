import { app } from '@trpc-lambda-demo/server';

import serverlessExpress from '@vendia/serverless-express';

exports.handler = serverlessExpress({ app });
