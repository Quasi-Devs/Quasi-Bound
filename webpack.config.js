const path = require('path');

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, './client', 'src', 'Index.jsx'),
  output: {
    filename: 'bumble.js',
    path: path.join(__dirname, './client', 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      }, {
        test: /\.(css)$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(gltf)$/,
        use: [
          {
            loader: 'gltf-webpack-loader',
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|bin|jpeg|wav|mp3|eot|ttf|woff|woff2)$/,
        exclude: /node_modules/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  devtool: 'eval-source-map',
  resolve: {
    extensions: ['.jsx', '.js'],
  },
};
