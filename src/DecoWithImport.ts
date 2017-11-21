import { mask } from './globals'

export function create (decorator, node, ctr) {
	let result = getBemModule(node, ctr, decorator.name);
	if (result == null) {
		return null;
	}
	let [ module, importNode ] = result;
	return new BemModuleHandler(decorator, importNode, module);
}

class BemModuleHandler {
	constructor (public decorator, public importNode, public module) {
		
	}
	beforeRender (node, model, ctx, el, ctr) {
		let { module, importNode } = this;
		
		module.bemCss.transformAst(node);
		if (mask.is.NODE) {
			// for later serialization
			importNode.attr = { salt: module.bemCss.getSalt() };
		}
	}
}

let getBemModule;
(function () {
	const getBemModule_Return = [];
	getBemModule = function (node, ctr, name) {
		if (tryGetFromAst(node, name)) {
			return getBemModule_Return;
		}
		if (tryGetFromCompos(ctr, name)) {
			return getBemModule_Return;
		}
		return null;
	};

	function tryGetFromCompos (ctr, name) {
		let module = null, importNode = null;
		for(let cursor = ctr; cursor != null; cursor = cursor.parent) {
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
				importNode = cursor.nodes[i];
			}
			break;
		}
		if (module != null) {
			getBemModule_Return[0] = module;
			getBemModule_Return[1] = importNode;
			return true;
		}
		return false;
	}
	function tryGetFromAst (node, name) {
		let module = null, importNode = null;
		for(let cursor = node; cursor != null; cursor = cursor.parent) {
			if (cursor.tagName !== 'imports') {
				continue;
			}

			let nodes = cursor.nodes;
			for(let i = 0; i < nodes.length; i++) {
				let x = nodes[i];
				if (x.tagName !== 'import') {
					continue;
				}
				let import_ = x;
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
				importNode = import_;
				break;
			}
		}
		if (importNode != null) {
			let root;
			for(let cursor = importNode; cursor != null; cursor = cursor.parent) {
				if (cursor.parent == null) {
					root = cursor;
				}
			}
			if (root && root.filename) {
				module = mask.Module.createModule(importNode, root);
			}
		}
		if (module != null) {
			getBemModule_Return[0] = module;
			getBemModule_Return[1] = importNode;
			return true;
		}
		return false;
	}
}());

