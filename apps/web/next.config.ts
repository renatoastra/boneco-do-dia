import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	transpilePackages: [
		"@repo/api",
		"@repo/auth",
		"@repo/database",
		"@gebra/core",
		"@gebra/utils",
		"@gebra/logs",
	],
	images: {
		remotePatterns: [
			{
				// google profile images
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
			},
			{
				// github profile images
				protocol: "https",
				hostname: "avatars.githubusercontent.com",
			},
		],
	},
	webpack: (config, { webpack }) => {
		config.plugins.push(
			new webpack.IgnorePlugin({
				resourceRegExp: /^pg-native$|^cloudflare:sockets$/,
			}),
		);

		return config;
	},
};

export default nextConfig;
