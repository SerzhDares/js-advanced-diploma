const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCSSExtractPlugin.loader,
                    'css-loader',
                ]
            },
            {
                test: /\.html$/i,
                use: [
                  {
                    loader: 'html-loader',
                  },
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
              },
        ]
    },
    plugins:  [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html',
        }),
        new MiniCSSExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        })
    ]
}