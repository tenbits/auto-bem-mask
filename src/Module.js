let AutoBem = require('auto-bem');

mask.Module.registerModuleType('style', 'bem', {
	bemCss: null,
	load_ () {
		return mask.File.get(this.path).then(style => {
			this.bemCss = new AutoBem.BemCss(style, {
				filename: this.path,
				salt: this.attr && this.attr.salt
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