const path = require('path');


const postCssLoader = function(mode) {
    const baseConfig = {
        loader: 'postcss-loader',
        options: {
            sourceMap: mode === 'development',
            config: {
                path: path.resolve(__dirname, '..')
            }
        }
    }

    return baseConfig;
};


module.exports = postCssLoader;
