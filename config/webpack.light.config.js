const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const devServerConfig = require('./devServer.config');
const HWPConfig = require('./settingsLoadersAndPlugins/HtmlWebpackPluginConfig');
const cssLoader = require('./settingsLoadersAndPlugins/cssLoader');
const postCssLoader = require('./settingsLoadersAndPlugins/postCSSLoader');
const lessLoader = require('./settingsLoadersAndPlugins/lessLoader');
const scssLoader = require('./settingsLoadersAndPlugins/scssLoader');
const styleOutput = require('./settingsLoadersAndPlugins/stylesOutput');
const alias = require('./alias');
const _path_ = require('./__path');


const webPackConfigure = (isHot=true) => {
    const styleLoader = styleOutput('development', 'loader', isHot);
    const entryCustome = isHot
        ? { app: [ 'react-hot-loader/patch', _path_.mainEntryPointPath ] } 
        : _path_.mainEntryPointPath;
    const aliasCustome = alias(isHot);
    const cssLoaderCustome = cssLoader('development');
    const postCssLoaderCustome = postCssLoader('development');
    const scssLoaderCustome = scssLoader('development');
    const lessLoaderCustome = lessLoader('development');
    const configForHWP = HWPConfig('development');

    return{
        devtool: 'source-map',
        devServer: devServerConfig,
        entry: entryCustome,
        output: {
            path: _path_.distBasePath,
            filename: '[name].build.js'
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
                    use: [ styleLoader, cssLoaderCustome, postCssLoaderCustome ],
                    include: [ _path_.srcBasePath ]
                },
                {
                    test: /\.(sa|sc)ss$/,
                    exclude: /(node_modules|bower_components)/,
                    use: [ styleLoader , cssLoaderCustome, postCssLoaderCustome, scssLoaderCustome ],
                    include: [ _path_.srcBasePath ]
                },
                {
                    test: /\.less$/,
                    exclude: /(node_modules|bower_components)/,
                    use: [ styleLoader, cssLoaderCustome, postCssLoaderCustome, lessLoaderCustome ],
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
                    use: [ { loader: 'url-loader', options: { limit: 10000 } } ]
                }
            ]
        },
        resolve: { 
            alias: aliasCustome,
            extensions: ['.js', '.jsx']
        },
        plugins: [
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin(configForHWP),
            new InterpolateHtmlPlugin({ 'SOURCE_URL': '.' }),
            new CopyWebpackPlugin([
                { from: _path_.publicGetPath('favicon.ico'), to: _path_.distBasePath },
                { from: _path_.publicGetPath('manifest.json'), to: _path_.distBasePath },
            ])
        ]
    }
};

module.exports = webPackConfigure;
