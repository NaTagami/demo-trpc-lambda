# Requirements

- Node.js (>= 16)
- localstack or docker
- cdklocal

# Install

```sh
npm install
```

# Deploy lambda

## run localstack

```sh
localstack start
```

or

```sh
docker run --rm -it -p 4566:4566 -p 4571:4571 localstack/localstack
```

## deploy

```sh
cd cdk
cdklocal bootstrap
cdklocal deploy LambdaStack
cdklocal deploy ApiGatewayStack
```

# Run webapp

```sh
cd next
echo TRPC_URL=https://\<Your ApiGateway Host\>/v1 > .env
npm run dev
```

open http://localhost:3000
