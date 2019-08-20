const cssLoaderConfig = function (mode) {
    const baseConfig = {
        loader: 'css-loader',
        options: {
            url: true,
            import: true,
            localsConvention: 'camelCase',
            sourceMap: true
        }
    };

    if (mode === 'development') return baseConfig;
    if (mode === 'production') {
        baseConfig.options.sourceMap = false;
        return baseConfig;
    }
};


module.exports = cssLoaderConfig;
