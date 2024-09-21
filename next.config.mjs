/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: "/shadertoy-in-threejs",
  webpack: (config) => {
    config.module.rules.push({
        test: /\.(glsl|vs|fs|vert|frag)$/,
        type: 'asset/source'
    });

    return config;
}
};

export default nextConfig;
