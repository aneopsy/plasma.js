'use strict'
/* global __dirname, require, module */
const path = require('path')
const packageJSON = require('./package.json')

const libraryName = packageJSON.name
const config = {
  entry: `${__dirname}/src/index.ts`,
  devtool: 'source-map',
  output: {
    path: `${__dirname}/lib`,
    filename: `${libraryName}.js`,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      { test: /\.(t|j)sx?$/, use: { loader: 'awesome-typescript-loader' } },
      // addition - add source-map support
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
    ]
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js', '.ts']
  }
}

module.exports = config
