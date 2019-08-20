const basicsLess = function(mode) {
    const config = {
        loader: 'less-loader',
        options: {
            sourceMap: mode === 'development' ? true : false
        }
    };
    
    return config;
};


module.exports = basicsLess;
