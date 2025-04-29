import adapter from '@sveltejs/adapter-netlify';

const config = {
  kit: {
    adapter: adapter({
      // opcional: onde você guardou suas Netlify Functions
      functions: 'netlify/functions',
    }),
    // não precisa mais de fallback nem prerender
    paths: { base: '' }
  }
};

export default config;