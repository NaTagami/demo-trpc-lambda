import * as cdk from '@aws-cdk/core';
import * as lambdaNodejs from '@aws-cdk/aws-lambda-nodejs';

export class CdkLambdaStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const region = cdk.Stack.of(this).region;

    new lambdaNodejs.NodejsFunction(this, 'trpcLambda', {
      entry: 'lib/lambdaEntry.ts',
      bundling: {},
      environment: {
        REGION: region,
        TZ: 'Asia/Tokyo',
      },
      functionName: 'trpcLambda',
    });
  }
}
