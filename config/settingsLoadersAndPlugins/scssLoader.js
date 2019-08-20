const scssLoaderConfig = function (mode) {
    const basicConfig = {
        loader: 'sass-loader',
        options: {
            sourceMap: true,
            implementation: require('sass')
        }
    };

    if (mode === 'development') return basicConfig;
    if (mode === 'production') {
        basicConfig.options.sourceMap = false;
        return basicConfig;
    }
};


module.exports = scssLoaderConfig;
