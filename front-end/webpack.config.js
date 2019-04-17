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
        filename: 'project.bundle.js',
        // publicPath: '/'
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
            },
            {
                test: /\.(jpe?g|png|gif|ico)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /(\.css|\.scss|\.sass)$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')
                            ],
                            sourceMap: true
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            includePaths: [path.resolve(__dirname, 'src', 'scss')],
                            sourceMap: true
                        }
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
        hot: true,
        historyApiFallback: true // fixes the 'CANNOT GET /smth' issue
    }

};
