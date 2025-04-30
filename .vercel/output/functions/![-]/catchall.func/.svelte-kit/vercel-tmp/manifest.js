export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.DRn4iBtI.js",app:"_app/immutable/entry/app.DI3rRqQr.js",imports:["_app/immutable/entry/start.DRn4iBtI.js","_app/immutable/chunks/DMDpmyza.js","_app/immutable/chunks/DwaHF2ox.js","_app/immutable/chunks/CkYU9YMT.js","_app/immutable/entry/app.DI3rRqQr.js","_app/immutable/chunks/DwaHF2ox.js","_app/immutable/chunks/COC0GgQg.js","_app/immutable/chunks/adE62cOG.js","_app/immutable/chunks/keVY0Til.js","_app/immutable/chunks/CkYU9YMT.js","_app/immutable/chunks/BoT9xMRc.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js')),
			__memo(() => import('../output/server/nodes/3.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/chart",
				pattern: /^\/chart\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
