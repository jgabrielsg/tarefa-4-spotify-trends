

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.6830ac47.js","_app/immutable/chunks/scheduler.1e724640.js","_app/immutable/chunks/index.3b8d159a.js","_app/immutable/chunks/stores.c4d905d7.js","_app/immutable/chunks/singletons.6bcd1206.js"];
export const stylesheets = [];
export const fonts = [];
