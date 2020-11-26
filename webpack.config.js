const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
    alias: {
        Utils: path.resolve(__dirname, "src/utils/"),
        Common: path.resolve(__dirname, "src/"),
        Components: path.resolve(__dirname, "src/components"),
        Pages: path.resolve(__dirname, "src/pages"),
        Api: path.resolve(__dirname, "src/api"),
        Store: path.resolve(__dirname, "src/store"),
        Controllers: path.resolve(__dirname, "src/controllers"),
    }
  },
  devServer: {
    contentBase: "dist",
    compress: true,
    port: 3000,
    publicPath: '/',
    historyApiFallback: true,
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: path.resolve(__dirname, "tsconfig.json"),
            },
          },
        ],
        exclude: /(node_modules)/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "global.css",
    }),
    new HtmlWebpackPlugin({
        template: "./static/index.html"
    })
  ],
};
