var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var AssetsPlugin = require('assets-webpack-plugin');
var assetsPluginInstance = new AssetsPlugin({
  path: path.join(__dirname, '../static')
});

module.exports = function() {
  return {
    entry: {
      bundle: ['babel-polyfill', './client/src/index.js'],
      vendor: [
        'isomorphic-fetch',
        'moment',
        'react',
        'react-dom',
        'react-redux',
        'redux',
        'redux-thunk',
      ],
    },
    output: {
      path: path.resolve(__dirname, '../static'),
      publicPath: '/static/',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.scss', '.css'],
    },
    module: {
      rules: [
        {
          test: /.jsx?$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    'es2015',
                    {'modules': false}
                  ],
                  'stage-2',
                  'react'
                ],
              },
            },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.(scss|css)$/i,
          loader: ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: [
              'css-loader',
              'sass-loader',
            ],
          }),
        },
      ],
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: ['bundle', 'vendor', 'manifest'],
      }),
      assetsPluginInstance,
      // new webpack.ProvidePlugin({   
      //     jQuery: 'jquery',
      //     $: 'jquery',
      //     jquery: 'jquery'
      // })
    ],
  };
};
