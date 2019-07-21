const merge = require('webpack-merge');
const webpack = require('webpack');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpackConfig = require('../config/webpack.config.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const outputpath = "./"
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var webpackConfig = merge(baseWebpackConfig, {
    output: {
        publicPath: outputpath,
        filename: 'assets/js/[name].js',
        chunkFilename: 'assets/js/[name].[contenthash:8].js',
        path: path.resolve(__dirname, '../dist')
    },
    mode: 'production',
    optimization: {
        minimizer: [new UglifyJsPlugin(),new OptimizeCSSAssetsPlugin({})],
        splitChunks: {
            chunks: 'all',
            minSize: 50000,
            cacheGroups: {
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                },
                styles: {
                    name: 'styles',
                    test: /\.s?css$/,
                    chunks: 'all',
                    minChunks: 1,
                    reuseExistingChunk: true,
                    enforce: true,
                  },
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin( {
            root: path.resolve(__dirname, '../'),
            verbose: true,
            dry: false
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index_tem.html',
            inject: true,
            hash:true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "assets/css/[name].css"
        }),
        new BundleAnalyzerPlugin()
    ],
    module: {
        rules: [{
            test: /\.(sa|sc|c)ss$/,
            use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../dist/css/assets'
                    },

                },
                'css-loader',
                'sass-loader',
       
            ]
        }]
    }
});
module.exports = webpackConfig;