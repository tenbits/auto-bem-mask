let AutoBem = require('AutoBem');

mask.Module.registerModuleType('style', 'bem', {
	load_ () {
		return mask.file.get(this.path).then(style => {
			this.bemCss = new AutoBem.BemCss(style, {
				filename: this.path
			});

			if (isNode) {
				return;
			}

			var style = document.createElement('style');
			style.textContent = this.bemCss.getStyle();
			document.body.appendChild(style);
		});
	}
});