const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const webpackNodeExternals = require('webpack-node-externals');

const config = {
  // Inform webpack that we are building a bundle for NodeJS, rather than for the browser
  target: 'node',

  // Tell webpack the root file of our server application
  entry: './src/server.js',

  // Tell webpack where to put the bundle file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },

  // Tell webpack to not bundle any libraries into bundle.js on the server
  // if that library exist inside node_modules folder
  externals: [webpackNodeExternals()]
};

module.exports = merge(baseConfig, config);
