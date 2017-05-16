var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var webpackMerge = require('webpack-merge');

var commonConfig = require('./base.js');

module.exports = function(env) {
  console.log('Running production webpack configuration build');

  return webpackMerge(commonConfig(), {
    devtool: 'cheap-module-source-map',
    output: {
      filename: 'js/[name].[chunkhash].js',
    },
    performance: {
      hints: "warning",
    },
    plugins: [
      new ExtractTextPlugin({
        filename: 'css/style.[chunkhash].css',
        allChunks: true,
      }),
    ]
  });
};
