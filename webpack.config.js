const path = require('path')

module.exports = {
  entry: './src/app.jsx',
  output: {
    path: path.join(__dirname, 'public'), // where you wanna output the webpack file
    filename: 'bundle.js' // common filename for webpack
  },
  module: {
    rules: [{
      loader: 'babel-loader', // use babel
      test: /\.jsx$/, // look for all *.jsx files
      exclude: /node_modules/,
    },{
      test: /\.s?css$/,
      use: [ // use allows us to use an array of loaders
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }]
  },
  devtool: 'cheap-module-eval-source-map', // implement sourcemap
  devServer: {
    contentBase: path.join(__dirname, 'public'), // watch public folder
  }
};
