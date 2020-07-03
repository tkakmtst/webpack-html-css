const path = require('path');
const copyWebpackPlugin = require('copy-webpack-plugin');
const outputPath = path.join(__dirname, 'public');

module.exports = {
  // モードの設定、v4系以降はmodeを指定しないと、webpack実行時に警告が出る
  mode: 'development',
// エントリーポイントの設定
  entry: './src/js/app.js',
  // 出力の設定
  output: {
    // 出力先のパス（絶対パスを指定する必要がある
    path: outputPath,
    // 出力するファイル名
    filename: 'js/bundle.js'
  },
  // developmentモードで有効になるdevtool: 'eval'を上書き
  devtool: 'source-map',
  devServer: {
    inline: true,
    hot: true,
    open: true,
    openPage: "index.html",
    contentBase: path.join(__dirname, 'src'),
    watchContentBase: true,
    // PCのIPアドレスを入れる
    host: "192.168.mm.nn",
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                outputStyle: 'expand',
              }
            }
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|eot|wof|woff|woff2|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
          }
        ]
      }
    ]
  },
  plugins: [
    new copyWebpackPlugin({
      patterns: [
        { from: 'src/index.html', to: outputPath},
      ]
    })
  ]
};
