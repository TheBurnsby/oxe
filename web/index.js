
Oxe.setup({
	loader: {
		esm: true,
		est: true,
		base: true,
		loads: [
			// 'index.css',
			'assets/prism.css',
			'elements/e-menu.js'
		]
	},
	router: {
		base: true,
		// hash: true,
		// trailing: true,
		routes: [
			{
				title: 'Home',
				path: '/',
				component: 'v-home',
				url: 'views/v-home.js'
			},
			{
				title: 'Test',
				path: '/test',
				component: 'v-test',
				url: 'views/v-test.js'
			},
			{
				title: 'JS',
				path: '/js',
				component: 'v-js',
				url: 'views/v-js.js'
			},
			{
				title: 'Doxe',
				path: '/docs',
				component: 'v-docs',
				url: 'views/v-docs.js'
			},
			{
				title: '404',
				path: '/{*}',
				component: 'v-404',
				url: 'views/v-404.js'
			}
		]
	}
});
