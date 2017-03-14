mask.registerDecorator('bem', {
	beforeRender (node) {
		var bemModule = getBemModule(node);
		if (bemModule == null) {
			mask.log.errorWithNode('BEM Module is not found', node);
			return;
		}
		bemModule.bemCss.transformAst(node);
	}
});

function getBemModule (node) {
	var cursor = node.parent;
	while( cursor != null) {
		if (cursor.tagName !== 'imports') {
			continue;
		}

		var imports = cursor.imports_;
		for(var i = 0; i < imports.length; i++) {
			if (imports[i].module.moduleType === 'bem') {
				return imports[i].module;
			}
		}
	}
	return null;
}