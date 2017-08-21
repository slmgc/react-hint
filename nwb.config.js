const {resolve} = require('path')

module.exports = (nwb) => ({
	type: 'react-component',
	npm: {
		cjs: true,
		esModules: false,
		umd: 'ReactHintFactory'
	},
	webpack: {
		aliases: {
			css: resolve('css'),
			src: resolve('src')
		},
		extra: {
			plugins: [
				new nwb.webpack.ProvidePlugin({
					Component: ['react', 'Component'],
					React: 'react',
					render: ['react-dom', 'render']
				})
			]
		}
	}
})
