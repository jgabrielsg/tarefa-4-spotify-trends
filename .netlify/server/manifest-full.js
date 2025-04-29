export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","global.js","images/coldplaylogo.jpg","images/spotifylogo.png","loc.csv","style.css"]),
	mimeTypes: {".png":"image/png",".js":"application/javascript",".jpg":"image/jpeg",".csv":"text/csv",".css":"text/css"},
	_: {
		client: {"start":"_app/immutable/entry/start.0a8c2543.js","app":"_app/immutable/entry/app.03b1a307.js","imports":["_app/immutable/entry/start.0a8c2543.js","_app/immutable/chunks/scheduler.1e724640.js","_app/immutable/chunks/singletons.6bcd1206.js","_app/immutable/entry/app.03b1a307.js","_app/immutable/chunks/scheduler.1e724640.js","_app/immutable/chunks/index.3b8d159a.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js'))
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
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
