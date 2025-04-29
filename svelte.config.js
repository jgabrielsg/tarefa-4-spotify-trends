// svelte.config.js
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({ fallback: '404.html' }),
    prerender: { default: true },
    paths: { base: '' }
  }
};

export default config;
