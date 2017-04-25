module.exports = {
	suites: {
		
		'node': {
			exec: 'node',
			env: [
				'/node_modules/maskjs/lib/mask.node.js::mask',
				'/lib/auto-bem-mask.js::_',
			],
			tests: 'test/node/**.test'
		},
		'examples': {
			exec: 'dom',
			tests: 'test/examples/**.test'	
		}
	}
};