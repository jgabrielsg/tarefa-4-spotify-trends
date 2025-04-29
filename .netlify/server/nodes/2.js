

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.62cad660.js","_app/immutable/chunks/scheduler.1e724640.js","_app/immutable/chunks/index.3b8d159a.js","_app/immutable/chunks/Chart.svelte_svelte_type_style_lang.1ed6ace1.js"];
export const stylesheets = ["_app/immutable/assets/2.f3077f95.css","_app/immutable/assets/Chart.2f248166.css"];
export const fonts = [];
