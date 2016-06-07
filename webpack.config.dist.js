const path = require('path')

module.exports = {
  devtool: 'source-map',
  entry: [
    './source/index.js'
  ],
  output: {
    path: 'dist',
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    library: 'react-highlight-words'
  },
  plugins: [
  ],
  externals: {
    'react': 'react'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /(node_modules)/,
        include: path.join(__dirname, 'source')
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css?modules&importLoaders=1', 'cssnext'],
        exclude: path.join(__dirname, 'node_modules')
      }
    ]
  }
}
