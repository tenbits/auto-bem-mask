mask.registerDecorator('bem', {
	isFactory: true,
	name: null,
	constructor (name) {
		this.name = name;
	},
	beforeRender (node) {
		var bemModule = getBemModule(node, this.name);
		if (bemModule != null) {
			bemModule.bemCss.transformAst(node);
		}
	}
});

var arr = [];
function getBemModule (node, name) {
	var module = null;
	for(var cursor = node.parent; cursor != null; cursor = cursor.parent) {
		if (cursor.tagName !== 'imports') {
			continue;
		}

		var imports = cursor.imports_;
		for(var i = 0; i < imports.length; i++) {
			var import_ = imports[i];
			if (import_.module.moduleType !== 'bem') {
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