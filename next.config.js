/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        GH_CLIENT_ID: process.env.GH_CLIENT_ID,
    },
}

module.exports = nextConfig
