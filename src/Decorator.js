let Style = require('./DecoWithStyle'),
	Import = require('./DecoWithImport'),
	Handlers = [ Style, Import ];

mask.defineDecorator('bem', {
	isFactory: true,
	name: null,
	constructor (name) {
		this.name = name;
	},
	beforeRender (node, model, ctx, el, ctr) {
		for (let i = 0; i < Handlers.length; i++) {
			let handler = Handlers[i].create(this, node, ctr);
			if (handler == null) {
				continue;
			}
			handler.beforeRender(node, model, ctx, el, ctr);
			return;
		}
		mask.log.errorWithNode('Neither nested Style nor BEM import is found', node);
	}
});
