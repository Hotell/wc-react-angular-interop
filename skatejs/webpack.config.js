const { resolve } = require( 'path' );

const webpack = require( 'webpack' );

// plugins
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );

module.exports = ( env ) => {

  return {
    context: resolve( __dirname, 'src' ),
    entry: {
      app: './main.ts'
    },
    output: {
      filename: '[name].[hash].js',
      path: resolve( 'dist' ),
      // Include comments with information about the modules.
      pathinfo: true,
    },

    resolve: {
      extensions: [
        '.js',
        '.ts',
        '.tsx'
      ]
    },

    devtool: 'cheap-module-source-map',

    module: {
      loaders: [
        { test: /\.tsx?$/, loaders: [ 'awesome-typescript-loader' ], exclude: /node_modules/ },
        {
          test: /\.scss$/,
          // loaders: ['style', 'css', 'sass'],
          loaders: [
            { loader: 'raw-loader' },
            {
              loader: 'sass-loader',
              query: {
                includePaths: [ resolve( __dirname, './node_modules/' ) ]
              }
            }
          ]
        }
      ],

    },

    plugins: [

      new HtmlWebpackPlugin( {
        template: resolve( 'index.html' )
      } )

    ]

  }
};
