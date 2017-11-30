import Escape from 'modules/escape.js';
import Say from 'say.js';

var home = Escape(`
	Oxe.component.define({
		name: 'v-home',
		html: \`
			<h1 o-text="title"></h1>
		\`,
		model: {
			title: 'Old Title'
		},
		created: function () {
			this.model.title = 'New Title';
		}
	});
`);

var indexjs = Escape(`
	Oxe.setup({
		keeper: {
			unauthorized: '/sign-in', // string or function
		},
		fetcher: {
			auth: true, // enables keeper for all fetches
			request: function (opt, xhr) {
				return true; // false will cancel the fetcher.fetch
			},
			response: function (opt, xhr) {
				return true; // false will cancel the fetcher.fetch handlers
			}
		},
		loader: {
			esm: true, // Enables ES6 module re-writes support
			est: true, // Enables ES6 template string re-writes support
			loads: [
				{
					url: '/components/e-menu.js'
				}
			]
		},
		router: {
			auth: true, // enables keeper for all routes
			routes: [
				{
					path: '/',
					title: 'Home',
					component: 'v-home',
					url: 'views/v-home.js'
				}
			]
		}
	});
`);

var indexhtml = Escape(/*html*/`
	<html>
	<head>
		<base href="/">
		<script src="oxe.min.js" defer></script>
		<script src="index.js" defer></script>
	</head>
	<body>
		<e-menu>
			<ul>
				<li><a href="/home">Home</a></li>
			</ul>
		</e-menu>
		<o-view></o-view>
	</body>
	</html>
`);

Oxe.component.define({
	name: 'v-home',
	attached: function () {
		Prism.highlightAll();
	},
	created: function () {
		console.log(Oxe.location);
		Say('v-home created');
	},
	html: `
		<div class="title">
			<h1>Oxe</h1>
			<h2>A mighty tinny web components framework/library</h2>
			<a class="button" src="">DOXE</a>
			<a class="button" src="">GITHUB</a>
		</div>

		<div class="row">
			<div class="col-xs-4">
				<h3>Features</h3>
				<p>Really Small 8.09KB gzipped and 27.08KB uncompressed</p>
				<p>In browser ES6/ESM module and template strings support</p>
			</div>
			<div class="col-xs-4">
				<h3>Support</h3>
				<p>IE10~</p>
				<p>IE11</p>
				<p>Chrome</p>
				<p>Firefox</p>
				<p>Safari 7</p>
				<p>Mobile Safari</p>
				<p>Chrome Android</p>
			</div>
			<div class="col-xs-4">
				<h3>Install</h3>
				<p><i>npm install oxe --save</i></p>
				<p>UMD <i>"dist/oxe.min.js"</i></p>
				<p>UMD with Web Component Pollyfill <i>"dist/oxe.polly.min.js"</i></p>
				<p>Web Component Pollyfill <i>"dist/webcomponents-lite.min.js"</i></p>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-4">
				<h2>Example Component</h2>
				<p>Create a new component by filling details out in object</p>
			</div>
			<div class="col-xs-8">
				<pre>
					<code class="language-js">${home}</code>
				</pre>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-8">
				<pre>
					<code class="language-js">${indexjs}</code>
				</pre>
			</div>
			<div class="col-xs-4">
				<h2>Example Setup</h2>
				<p>Create a new component by filling details out in object</p>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-4">
				<h2>index.html</h2>
				<p>Create a new component by filling details out in object</p>
			</div>
			<div class="col-xs-8">
				<pre>
					<code class="language-html">${indexhtml}</code>
				</pre>
			</div>
		</div>
	`
});
