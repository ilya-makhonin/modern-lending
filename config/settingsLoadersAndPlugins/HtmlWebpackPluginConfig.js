const _path_ = require('../__path');

const config = function (mode) {
    let baseConfig = {
        filename: 'index.html',
        path: _path_.distBasePath,
        template: _path_.publicHTMLPath,
        inject: true
    };

    const minify = {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
    };

    if (mode === 'development') {
        return baseConfig;
    }

    if (mode === 'production') {
        return { ...baseConfig, minify }
    }
};


module.exports = config;