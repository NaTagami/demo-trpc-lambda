import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigateway from '@aws-cdk/aws-apigateway';

export class CdkApiStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const accountId = cdk.Stack.of(this).account;
    const region = cdk.Stack.of(this).region;
    const echoFunction = lambda.Function.fromFunctionArn(
      this,
      'trpcLambda',
      `arn:aws:lambda:${region}:${accountId}:function:trpcLambda`
    );

    const restApi = new apigateway.RestApi(this, 'RestApi', {
      restApiName: `echo-api`,
      deployOptions: {
        stageName: 'v1',
      },
    });

    restApi.root.addProxy({
      defaultIntegration: new apigateway.LambdaIntegration(echoFunction),
    });

    new lambda.CfnPermission(this, `${echoFunction}-Permission`, {
      principal: 'apigateway.amazonaws.com',
      action: 'lambda:InvokeFunction',
      functionName: echoFunction.functionName,
      sourceArn: restApi.arnForExecuteApi(),
    });
  }
}
