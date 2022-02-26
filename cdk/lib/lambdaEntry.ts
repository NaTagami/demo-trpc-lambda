import { app } from '@sample-monorepo/server';

import serverlessExpress from '@vendia/serverless-express';

exports.handler = serverlessExpress({ app });
