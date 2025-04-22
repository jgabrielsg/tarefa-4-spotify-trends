/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig = {
  assetPrefix: isGithubPages ? '/tarefa-4-spotify-trends' : '',
  basePath: isGithubPages ? '/tarefa-4-spotify-trends' : '',
  output: 'export',
  reactStrictMode: true,
}

module.exports = nextConfig;