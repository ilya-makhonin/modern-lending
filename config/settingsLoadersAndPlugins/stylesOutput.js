const styleOutput = function (mode, type='loader', isHot=true) {
    const forDevelopmentStyleLoader = {
        loader: 'style-loader',
        options: {
            hmr: isHot,
            sourceMap: true,
            singleton: false
        }
    };

    // If user loader this function returned full rule for use property
    if (mode === 'development' && type === 'loader') return forDevelopmentStyleLoader;
    if (mode === 'production' && type === 'loader') {
        forDevelopmentStyleLoader.options.hmr = false;
        return forDevelopmentStyleLoader;
    }

    // If used mini-css-extract-plugin this function returned only
    // options for use property and config for new plugin instance
    if (mode === 'development' && type === 'plugin') {
        return {
            options: { hmr: isHot, reloadAll: true },
            forPlugin: {
                filename: '[name].css'
            }
        };
    }
    if (mode === 'production' && type === 'plugin') {
        return {
            options: { hmr: false },
            forPlugin: {
                filename: 'assets/css/[name].[hash].css',
                chunkFilename: 'assets/css/[id].css'
            }
        };
    }
};


module.exports = styleOutput;
