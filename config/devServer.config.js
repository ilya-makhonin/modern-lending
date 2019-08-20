const _path_ = require('./__path');

module.exports = {
    contentBase: _path_.distBasePath,
    compress: true,
    host: 'localhost',
    port: process.env.PORT || 8080,
    historyApiFallback: true,
    inline: true,
    open: true,
    hot: true
};
