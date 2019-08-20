const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const HWPConfig = require('./settingsLoadersAndPlugins/HtmlWebpackPluginConfig');
const cssLoader = require('./settingsLoadersAndPlugins/cssLoader')('production');
const postCssLoader = require('./settingsLoadersAndPlugins/postCSSLoader')('production');
const lessLoader = require('./settingsLoadersAndPlugins/lessLoader');
const scssLoader = require('./settingsLoadersAndPlugins/scssLoader');
const styleOutput = require('./settingsLoadersAndPlugins/stylesOutput');

const { options, forPlugin } = styleOutput('production', 'plugin');
const miniCssPlugin = { loader: MiniCssExtractPlugin.loader, options };

const alias = require('./alias');
const _path_ = require('./__path');


const buildConfig = {
    optimization: {
        minimizer: [
            new TerserJSPlugin({
                terserOptions: {
                    parse: { ecma: 8 },
                    compress: {
                        ecma: 5,
                        warnings: false,
                        comparisons: false,
                        inline: 2
                    },
                    output: {
                        ecma: 5,
                        comments: false,
                        ascii_only: true
                    }
                },
                cache: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
        splitChunks: {
            chunks: 'all'
        }
    },
    devtool: false,
    performance: false,
    entry: _path_.mainEntryPointPath,
    output: {
        path: _path_.distBasePath,
        filename: 'assets/js/[name].[hash].build.js',
        chunkFilename: 'assets/js/[name].[hash].chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                enforce: 'pre',
                use: 'eslint-loader',
                include: [ _path_.srcBasePath ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: 'babel-loader',
                include: [ _path_.srcBasePath ]
            },
            {
                test: /\.css$/,
                exclude: /(node_modules|bower_components)/,
                use: [ miniCssPlugin, cssLoader, postCssLoader ],
                include: [ _path_.srcBasePath ]
            },
            {
                test: /\.(sa|sc)ss$/,
                exclude: /(node_modules|bower_components)/,
                use: [ miniCssPlugin, cssLoader, postCssLoader, scssLoader('production') ],
                include: [ _path_.srcBasePath ]
            },
            {
                test: /\.less$/,
                exclude: /(node_modules|bower_components)/,
                use: [ miniCssPlugin, cssLoader, postCssLoader, lessLoader('production') ],
                include: [ _path_.srcBasePath ]
            },
            {
                test: /\.svg$/,
                use: [ 
                    { loader: 'babel-loader' },
                    {
                        loader: 'react-svg-loader',
                        options: { jsx: true }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|eot|ttf|woff|woff2)$/,
                exclude: [/\.(js|jsx)$/, /\.html$/, /\.json$/],
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[hash].[ext]',
                            outputPath: 'assets/media'
                        }
                    },
                ]
            }
        ]
    },
    resolve: { 
        alias: alias(),
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(forPlugin),
        new HtmlWebpackPlugin(HWPConfig('production')),
        new InterpolateHtmlPlugin({ 'SOURCE_URL': 'assets' }),
        new ManifestPlugin({ fileName: 'assets-manifest.json' }),
        new CopyWebpackPlugin([
            { from: _path_.publicGetPath('favicon.ico'), to: _path_.distGetPath('assets') },
            { from: _path_.publicGetPath('manifest.json'), to: _path_.distBasePath },
        ])
    ]
};


module.exports = buildConfig;
