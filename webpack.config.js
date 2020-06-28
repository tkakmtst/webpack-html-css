const path = require('path');
const copyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  // モードの設定、v4系以降はmodeを指定しないと、webpack実行時に警告が出る
  mode: 'development',
  // エントリーポイントの設定
  entry: './src/js/app.js',
  // 出力の設定
  output: {
    // 出力先のパス（絶対パスを指定する必要がある
    path: path.join(__dirname, 'public/js/'),
    // 出力するファイル名
    filename: 'bundle.js',
  },
  // developmentモードで有効になるdevtool: 'eval'を上書き
  devtool: 'source-map',
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
      }
    ]
  },
  plugins: [
    new copyWebpackPlugin({
      patterns: [
        { from: 'src/index.html', to: '../index.html'},
        { from: 'src/images', to: '../images'}
      ]
    })
  ]
};
