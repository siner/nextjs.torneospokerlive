/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'torneospokerlive.com',
                port: '',
                pathname: '/images/**',
            },
        ],
    },
    async redirects() {
        return [
            {
                source: '/casino/:slug',
                destination: '/casinos/:slug',
                permanent: true,
            },
            {
                source: '/evento/:slug',
                destination: '/eventos/:slug',
                permanent: true,
            },
            {
                source: '/torneo/:id',
                destination: '/torneos/:id',
                permanent: true,
            },
        ]
    },

    reactStrictMode: true,
    experimental: {
        appDir: true,
        swcPlugins: [['next-superjson-plugin', {}]],
    },
}

module.exports = nextConfig
