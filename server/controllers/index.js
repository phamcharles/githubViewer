const fs = require('fs');
const path = require('path');

const indexController = (req, res) => {
	switch (req.method) {
		case 'GET':
			const webpackAssetsFile = path.resolve(__dirname, '../../static/webpack-assets.json')
			const webpackAssetsString = fs.readFileSync(webpackAssetsFile);
			const webpackAssetsContent = JSON.parse(webpackAssetsString);		

			const bundleCss = webpackAssetsContent.bundle.css;
			const bundleJs = webpackAssetsContent.bundle.js;
			const manifestJs = webpackAssetsContent.manifest.js;
			const vendorJs = webpackAssetsContent.vendor.js;
			
			res.render('index', {
				bundleCss,
				bundleJs,
				manifestJs,
				vendorJs,
			})
			break;
		default:
			break;
	}
}

module.exports = indexController;