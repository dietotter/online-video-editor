'use strict';

const webpack = require('webpack')
const path = require('path')

const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {

    entry: [
        'react-hot-loader/patch',
        // 'webpack-hot-middleware/client',
        path.resolve(__dirname, 'src/index.js')
    ],
    //
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'project.bundle.js'
    },

    devtool: 'eval-source-map',

    mode: 'development',

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loaders: ['babel-loader'],
                include: path.join(__dirname, 'src'),
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            }
        ]

    },

    plugins: [
        new HtmlWebPackPlugin({
            template: "index.html",
            filename: "index.html"
        }),
        new webpack.HotModuleReplacementPlugin()
    ],

    devServer: {
        port: 3000,
        hot: true
    }

};
