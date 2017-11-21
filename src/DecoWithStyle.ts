import * as AutoBem from 'auto-bem';

export function create (decorator, node, ctr) {
	let styleNode = getStyle(node);
	if (styleNode == null) {
		return null;
	}		
	return new StyleNodeHandler(decorator, styleNode);
}


export class StyleNodeHandler {
	constructor (public decoratorNode, public styleNode) {
		if (styleNode.bemCss == null) {
			styleNode.bemCss = new AutoBem.BemCss(styleNode.content, {
				salt: styleNode.attr && styleNode.attr.salt
			});
			styleNode.content = styleNode.bemCss.getStyle();
		}
	}
	beforeRender (node, model, ctx, el, ctr) {		
		this.styleNode.bemCss.transformAst(node);		
	}
}

function getStyle (node) {
	let arr = node.nodes;
	if (arr == null || arr.length === 0) {
		return null;
	}
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].tagName === 'style') {
			return arr[i];
		}
	} 
	return null;
}