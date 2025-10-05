/** @type {import('next').NextConfig} */
const nextConfig = {
    allowedDevOrigins: [
        'http://192.168.100.6:3000',
        'http://localhost:3000',
        // 'http://192.168.100.6:8080',
        // 'http://localhost:8080'
    ],
}

module.exports = nextConfig;