/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const withTM = require('next-transpile-modules')(['../common']);
//const withTM = require('next-transpile-modules')(['@trpc-lambda-demo/common']);

module.exports = withTM(nextConfig);
