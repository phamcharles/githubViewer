var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var webpackMerge = require('webpack-merge');

var commonConfig = require('./base.js');

module.exports = function(env) {
  console.log('Running development webpack configuration build');

  return webpackMerge(commonConfig(), {
    devServer: {
      historyApiFallback: true,
    },
    devtool: 'eval',
    entry: {
      vendor: [
        'redux-logger',
      ],
    },
    output: {
      filename: 'js/[name].js',
    },
    performance: {
      hints: false
    },
    plugins: [
      new ExtractTextPlugin({
        filename: 'css/style.css',
        allChunks: false,
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"development"',
      }),
    ],
  });
};
