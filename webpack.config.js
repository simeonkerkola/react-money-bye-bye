const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = (env) => {
  const isProduction = env === 'production'
  const CSSExtract = new ExtractTextPlugin('styles.css')

  return {
    entry: './src/app.js',
    output: {
      path: path.join(__dirname, 'public'), // where you wanna output the webpack file
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
              }
            }, {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              }
            }],
          }),
        },
      ],
    },
    plugins: [
      // plugins go here
      CSSExtract,
    ],
    devtool: isProduction ? 'source-map' : 'inline-source-map', // check if production, implement sourcemap
    devServer: {
      contentBase: path.join(__dirname, 'public'), // watch public folder
      historyApiFallback: true, // tells dev-server we r handling routing via client side code (serve index.html every time we get a 404)
    },
  }
}
