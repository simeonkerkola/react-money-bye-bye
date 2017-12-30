const path = require('path')
const webpack = require('webpack')
const DotEnv = require('dotenv')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

if (process.env.NODE_ENV === 'test') {
  DotEnv.config({ path: '.env.test' })
} else if (process.env.NODE_ENV === 'development') {
  DotEnv.config({ path: '.env.development' })
}

module.exports = (env) => {
  const isProduction = env === 'production'
  const CSSExtract = new ExtractTextPlugin('styles.css')

  return {
    entry: ['babel-polyfill', './src/app.js'], // babel-polyfill first to add support for older browsers
    output: {
      path: path.join(__dirname, 'public', 'dist'), // where you wanna output the webpack file
      filename: 'bundle.js', // common filename for webpack
    },
    module: {
      rules: [
        {
          loader: 'babel-loader', // use babel
          test: /\.js$/, // look for all *.js files
          exclude: /node_modules/,
        },
        {
          test: /\.s?css$/, // look for both css and scss files
          // use allows us to use an array of loaders
          use: CSSExtract.extract({
            // loaders go inside a plugin
            use: [{
              loader: 'css-loader',
              options: {
                sourceMap: true, // enable sourcemap support for more dev friendly environment
              },
            }, {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            }],
          }),
        },
      ],
    },
    plugins: [
      // plugins go here
      CSSExtract,
      new webpack.DefinePlugin({
        'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
        'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
        'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
        'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
      }),
    ],
    devtool: isProduction ? 'source-map' : 'inline-source-map', // check if production, implement sourcemap
    devServer: {
      contentBase: path.join(__dirname, 'public'), // watch public folder
      historyApiFallback: true, // tells dev-server we r handling routing via client side code (serve index.html every time we get a 404)
      publicPath: '/dist/',
    },
  }
}
