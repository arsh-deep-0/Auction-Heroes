const API_URL = process.env.NEXT_PUBLIC_API_URL;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     async rewrites() {
// 		return [
// 			{
//             source: '/api/:path*',
// 				destination: `${API_URL}/:path*`,
// 			},
// 		]
// 	},
// };

// export default nextConfig;

module.exports = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: "/api/:path*{/}",
        destination: `${API_URL}/:path*`,
		permanent:true
      },
    ];
  },
};
