const TransformPages = require('uni-read-pages')
const {webpack} = new TransformPages
// const tfPages = new TransformPages()
module.exports = {
	configureWebpack: {
		plugins: [
			new webpack.DefinePlugin({
				ROUTES: webpack.DefinePlugin.runtimeValue(() => {
					const tfPages = new TransformPages({
						includes: ['path', 'name', 'meta','needLogin']
					})
					return JSON.stringify(tfPages.routes)
				}, true)
			})
			/* new tfPages.webpack.DefinePlugin({
				ROUTES: JSON.stringify(tfPages.routes)
			}) */
		],
	},
}