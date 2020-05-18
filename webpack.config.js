const path = require('path');
const pkg = require('./package.json');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const buildPath = './build/';

module.exports = {
  entry: ['./src/entry.js'],
  output: {
    // publicPath: '/assets/',
    path: path.join(__dirname, buildPath),
    filename: '[name].[hash].js'
  },
  target: 'web',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: path.resolve(__dirname, './node_modules/')
      },{
        test: /\.(jpe?g|png|gif|svg|tga|gltf|babylon|mtl|pcb|pcd|prwm|obj|mat|mp3|ogg|fbx)$/i,
        use: 'file-loader',
        exclude: path.resolve(__dirname, './node_modules/')
      },{
        test: /\.(vert|frag|glsl|shader|txt)$/i,
        use: 'raw-loader',
        exclude: path.resolve(__dirname, './node_modules/')
      },{
        type: 'javascript/auto',
        test: /\.(json)/,
        exclude: path.resolve(__dirname, './node_modules/'),
        use: [{
          loader: 'file-loader'
        }],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({'title': 'my three.js project'}),
    new CopyPlugin({
      patterns: [
        { from: 'assets', to: 'assets' },
      ],
    }),
  ]
}
