'use strict';

let path = require('path');
let webpack = require('webpack');

let baseConfig = require('./base');
let defaultSettings = require('./defaults');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');

let config = Object.assign({}, baseConfig, {
  entry: path.join(__dirname, '../src/index'),
  cache: false,
  devtool: 'sourcemap',
  plugins: [
    new webpack.optimize.DedupePlugin(),//检测相似文件和文件中的冗余并在output中挑出掉
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    }),
    new webpack.optimize.UglifyJsPlugin(),//压缩输出的js代码
    new webpack.optimize.OccurenceOrderPlugin(),//按照引用频率来排序各个模块bundle的id，引用的越频繁，id值就越短。以便达到减小文件大小的效果
    new webpack.optimize.AggressiveMergingPlugin(),//优化相似的代码段，合并相似的代码段，提取公共部分
    new webpack.NoErrorsPlugin()//保证编译过程不出错
  ],
  module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel',
  include: [].concat(
    config.additionalPaths,
    [ path.join(__dirname, '/../src') ]
  )
});

module.exports = config;
