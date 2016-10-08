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

    devtool: 'source-map',

    module: {
      loaders: [
        { test: /\.tsx?$/, loaders: [ 'awesome-typescript-loader' ], exclude: /node_modules/ },
        {
          test: /\.scss$/,
          // loaders: ['style', 'css', 'sass'],
          loaders: [
            // 'raw-loader',
            'to-string-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              query: {
                includePaths: [ resolve( __dirname, './node_modules/' ) ]
              }
            }
          ]
        },
        {test: /\.svg/, loader: 'svg-url-loader'}
      ],

    },

    plugins: [

      new HtmlWebpackPlugin( {
        template: resolve( 'index.html' )
      } )

    ]

  }
};
