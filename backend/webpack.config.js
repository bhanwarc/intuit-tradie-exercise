const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const slsw = require("serverless-webpack");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  target: "node",
  entry: slsw.lib.entries,
  mode: isProduction ? "production" : "development",
  node: false,
  optimization: {
    minimize: isProduction,
  },
  devtool: !isProduction && "inline-cheap-module-source-map",
  plugins: [
    new CopyPlugin({
      patterns: ["config/**", "models/**"],
    }),
    // suppress critical dependency warning
    new webpack.ContextReplacementPlugin(/\/sequelize\//, (data) => {
      data.dependencies.map((dependency) => {
        if (dependency.critical) {
          // eslint-disable-next-line no-param-reassign
          delete dependency.critical;
        }
        return null;
      });
      return data;
    }),
  ],
};
