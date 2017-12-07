Oxe.component.define({
    name: 'v-docs',
    model: {
	},
    events: {
        slideMenu: function () {
            var menu = document.querySelector('.side-menu');
            menu.style.transform = "translateX(0%)";
        }
    },
    created: function () {
		var footer = document.querySelector('footer');
    },
    html: `
        <div class="side-menu">
			<div>
				DOCS
	            <select>
	                <option value="v1.0">v1.0</option>
	                <option value="v2.0">v2.0</option>
	                <option value="v3.0">v3.0</option>
	            </select>
			</div>
			<div>
	            <h4>Getting Started</h4>
				<a href="">What is Oxe?</a>
	            <a href="">Installation</a>

				<h4>Setup Options</h4>
				<a href="">Setup</a>
				<a href="">Loader</a>
				<a href="">Keeper</a>
				<a href="">Router</a>
				<a href="">Fetcher</a>

				<h4>Component</h4>
				<a href="">Define</a>
				<a href="">Options</a>

                <h4>Setup Options</h4>
				<a href="">Setup</a>
				<a href="">Loader</a>
				<a href="">Keeper</a>
				<a href="">Router</a>
				<a href="">Fetcher</a>

				<h4>Component</h4>
				<a href="">Define</a>
				<a href="">Options</a>

                <h4>Setup Options</h4>
				<a href="">Setup</a>
				<a href="">Loader</a>
				<a href="">Keeper</a>
				<a href="">Router</a>
				<a href="">Fetcher</a>

				<h4>Component</h4>
				<a href="">Define</a>
				<a href="">Options</a>
			</div>
        </div>
        <button o-on-click="slideMenu" type="button" name="button">Click</button>

    `
});
