/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3000',
                pathname: '/uploads/**',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com'
            }
        ],
    },
};

export default nextConfig;
