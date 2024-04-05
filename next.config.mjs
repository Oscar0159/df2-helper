import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'df2profiler.com',
                port: '',
                pathname: '/gamemap/**',
            },
        ],
    },
};

export default withNextIntl(nextConfig);
