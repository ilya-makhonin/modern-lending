const _path_ = require('./__path');


const alias = (isHot=false) => {
    const baseAlias = {
        'components': _path_.srcGetPath('app', 'components'),
        'containers': _path_.srcGetPath('app', 'containers'),
        'assets': _path_.srcGetPath('app','assets'),
        'styles': _path_.srcGetPath('app', 'assets', 'styles'),
        'images': _path_.srcGetPath('app', 'assets', 'images'),
        'store': _path_.srcGetPath('app','store'),
        'reducer': _path_.srcGetPath('app','reducer'),
        'actions': _path_.srcGetPath('app','actions'),
        'constants': _path_.srcGetPath('app', 'constants'),
        'utils': _path_.srcGetPath('app', 'utils'),
    }

    if (isHot) {
        baseAlias['react-dom'] = '@hot-loader/react-dom'
    }

    return baseAlias;
};


module.exports = alias;
