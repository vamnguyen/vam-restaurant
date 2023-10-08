/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "ucarecdn.com",
      "lh3.googleusercontent.com",
      "*",
    ],
  },
};

module.exports = nextConfig;
