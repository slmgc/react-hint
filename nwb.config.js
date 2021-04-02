const {resolve} = require('path')

module.exports = (nwb) => ({
	type: 'react-component',
	npm: {
		cjs: true,
		esModules: false,
		umd: 'ReactHintFactory'
	},
	babel: {
		plugins: [
			['@babel/transform-react-jsx', {
				pragma: 'createElement'
			}]
		]
	},
	devServer: {
		disableHostCheck: true
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
