let AutoBem = require('auto-bem');

mask.Module.registerModuleType('style', 'bem', {
	load_ () {
		return mask.File.get(this.path).then(style => {
			this.bemCss = new AutoBem.BemCss(style, {
				filename: this.path
			});

			if (mask.is.NODE) {
				return;
			}

			var style = document.createElement('style');
			style.textContent = this.bemCss.getStyle();
			document.body.appendChild(style);
		});
	}
});