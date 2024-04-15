const API_URL = process.env.API_URL;
const SOCKET_URL=process.env.SOCKET_URL;

/** @type {import('next').NextConfig} */
const nextConfig = {
	env:{
		SOCKET_URL:SOCKET_URL
	},
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${API_URL}/:path*`,
      },
     
    ];
  },
  reactStrictMode: false,
};

export default nextConfig;
