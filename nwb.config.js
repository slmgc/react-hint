var path = require('path')

module.exports = {
	type: 'react-component',
	webpack: {
		aliases: {
			'react-hint': path.resolve('src')
		}
	},
	npm: {
		esModules: false,
		umd: {
			global: 'ReactHint',
			externals: {
				react: 'React'
			}
		}
	}
}