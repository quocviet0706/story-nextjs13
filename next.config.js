/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["nettruyennew.com", "nettruyenco.vn", "cdnntx.com", "comics-api.vercel.app"]
    },
    env: {
        COMIC_API_URL: "https://comics-api.vercel.app"
    }
}

module.exports = nextConfig
