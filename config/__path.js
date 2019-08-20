const path = require('path');


const root = path.resolve(__dirname, '..');

// The basics paths to main folders of a project
const srcBasePath = path.resolve(root, 'src');
const publicBasePath = path.resolve(root, 'public');
const distBasePath = path.resolve(root, 'dist');

// The path to public index.html file
const publicHTMLPath = path.resolve(publicBasePath, 'index.html');

// The paths to main files of a React.js application
const mainEntryPointPath = path.resolve(srcBasePath, 'index.js');
const mainAppFilePath = path.resolve(srcBasePath, 'App.js');


// ***************** Functions for getting path to some directory *****************

const srcGetPath = (...pathFor) => path.resolve(srcBasePath, ...pathFor);
const distGetPath = (...pathFor) => path.resolve(distBasePath, ...pathFor);
const publicGetPath = (...pathFor) => path.resolve(publicBasePath, ...pathFor);

// ********************************************************************************


module.exports = {
    root,
    srcBasePath,
    publicBasePath,
    publicHTMLPath,
    mainEntryPointPath,
    mainAppFilePath,
    distBasePath,
    srcGetPath,
    distGetPath,
    publicGetPath
};
