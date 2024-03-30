const API_URL = process.env.API_URL;
const SOCKET_URL=process.env.SOCKET_URL;

/** @type {import('next').NextConfig} */
const nextConfig = {
	env:{
		SOCKET_URL:"http://localhost:8080/"
	},
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${API_URL}/:path*`,
      },
     
    ];
  },
};

export default nextConfig;
