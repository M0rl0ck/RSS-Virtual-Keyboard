const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: ['./src/index.js', './src/scss/style.scss'],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'RSS Virtual keyboard',
      template: path.resolve(__dirname, './src/index.html'), // шаблон
      filename: 'index.html', // название выходного файла
      inject: 'body',
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader',
        ],
      },
    ],
  },

};
