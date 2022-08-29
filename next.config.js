/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig

// next.config.js
const withTM = require('next-transpile-modules')(['@4us-dev/utils']); // pass the modules you would like to see transpiled

module.exports = withTM({});