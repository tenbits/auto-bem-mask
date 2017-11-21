import {create as createWithStyle} from './DecoWithStyle'
import {create as createWithImport} from './DecoWithImport'
import { mask } from './globals';

export function initializeMaskDecorator (mask) {
	mask.defineDecorator('bem', {
		isFactory: true,
		name: null,
		constructor (name) {
			this.name = name;
		},
		beforeRender (node, model, ctx, el, ctr) {
			let handler = createWithStyle(this, node, ctr) || createWithImport(this, node, ctr);
			if (handler) {
				handler.beforeRender(node, model, ctx, el, ctr);
				return;
			}
			mask.log.errorWithNode('Neither nested Style nor BEM import is found', node);
		}
	});
}