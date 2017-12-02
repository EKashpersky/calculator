let
path      = require("path"),
parentDir = path.join(__dirname, "../");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const PATHS = {
  SOURCE: path.join(parentDir, "src"),
  BUILD: path.join(parentDir, "build"),
};

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: path.join(PATHS.SOURCE, "index.tsx"),
  output: {
    path: path.join(PATHS.BUILD),
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    loaders: [
      {
        test: /\.sass$/,
        exclude: path.resolve("../node_modules"),
        use: ExtractTextPlugin.extract({
          use: ["css-loader","sass-loader"],
        })
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: path.resolve("../node_modules"),
        loader: "ts-loader"
      }
    ]
  },
  plugins: [
    // new ExtractTextPlugin(path.join(PATHS.BUILD, "bundle.css"))
    new HtmlWebpackPlugin({
      template: path.join(PATHS.SOURCE, "index.html")
    }),
    new ExtractTextPlugin("bundle.css")
  ]
};