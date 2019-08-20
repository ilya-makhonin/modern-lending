const lightConfig = require('./config/webpack.light.config');
const buildConfig = require('./config/webpack.build.config');


module.exports = function(un, args){
    if (args.mode === 'development') {
        return lightConfig(false);
    }
    if (args.mode === 'production') {
        return buildConfig;
    }
    return lightConfig();
};
