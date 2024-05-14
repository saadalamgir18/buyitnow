/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:['res.cloudinary.com']
    },
    env:{
        MONGODB_URL: process.env.MONGODB_URL
    }

};

export default nextConfig;
