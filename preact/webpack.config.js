const { resolve } = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = ( env ) => ({
  devtool: 'source-map',
  context: resolve( __dirname, 'src' ),
  entry: {
    app: './main.tsx'
  },
  output: {
    filename: '[name].bundle.js',
    // The output directory as an absolute path.
    path: resolve( __dirname, 'dist' ),
  },
  resolve: {
    extensions: [ '.js','.ts', '.tsx' ]
  },
  module: {
    rules: [
      {
        test: /style\.css$/,
        exclude: /node_modules/,
        use: ['style-loader','css-loader']
      },
      {
        test: /\.css$/,
        exclude: /node_modules|style\.css/,
        use: ['raw-loader']
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [ 'awesome-typescript-loader' ]
        // loaders: [ 'ts-loader' ]
      },
      {
        test: /\.html$/,
        exclude: [ 'index.html' ],
        use: 'raw-loader',
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve( 'src', 'index.html' )
    })
  ]
});
