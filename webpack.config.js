const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    main: path.join(__dirname, 'src/index.ts'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.ts/,
        exclude: /(node_modules)/,
        use: ['ts-loader'],
      },
      {
        test: /\.(scss|sass|css)$/,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: "file-loader",
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns:[
        {
          from : "./src/assets/images",
          to : "./assets/images",
        }
      ]
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, './src/index.html'),
    }),
  ],
  stats: 'minimal',
  devtool: 'source-map',
  mode: 'development',
  devServer: {
    open: true,
    static: path.resolve(__dirname, './dist'),
    port: 4000,
    historyApiFallback: {
      index: 'index.html'
    }
  },
};