const {resolve} = require('path')

module.exports = (nwb) => ({
	type: 'react-component',
	npm: {
		cjs: true,
		esModules: false,
		umd: 'ReactHint'
	},
	babel: {
		plugins: [
			['transform-react-jsx', {
				pragma: 'createElement'
			}]
		]
	},
	webpack: {
		aliases: {
			css: resolve('css'),
			src: resolve('src')
		},
		extra: {
			plugins: [
				new nwb.webpack.ProvidePlugin({
					createElement: ['react', 'createElement']
				})
			]
		}
	}
})
