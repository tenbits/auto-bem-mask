mask.defineDecorator('bem', {
	isFactory: true,
	name: null,
	constructor (name) {
		this.name = name;
	},
	beforeRender (node, model, ctx, el, ctr) {
		var bemModule = getBemModule(node, ctr, this.name);
		if (bemModule != null) {
			bemModule.bemCss.transformAst(node);
		}
	}
});

var arr = [];
function getBemModule (node, ctr, name) {
	var module = null;
	for(var cursor = ctr; cursor != null; cursor = cursor.parent) {
		if (cursor.compoName !== 'imports') {
			continue;
		}

		var imports = cursor.imports_;
		for(var i = 0; i < imports.length; i++) {
			var import_ = imports[i];
			if (import_.moduleType !== 'bem') {
				continue;
			}
			if (name != null && import_.alias !== name) {
				continue;
			}
			if (module != null) {
				mask.log.errorWithNode('Ambiguous BEM import found', import_);
				return null;
			}
			module = import_.module;
		}
		break;
	}
	if (module == null) {
		mask.log.errorWithNode('BEM import not found', node);
	}
	return module;
}