const path = require('path')

module.exports = (env) => {
  const isProduction = env === 'production'

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
          use: [
            // use allows us to use an array of loaders
            'style-loader',
            'css-loader',
            'sass-loader',
          ],
        },
      ],
    },
    devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map', // check if production, implement sourcemap
    devServer: {
      contentBase: path.join(__dirname, 'public'), // watch public folder
      historyApiFallback: true, // tells dev-server we r handling routing via client side code
    },
  }
}
