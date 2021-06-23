const fs = require('fs');

const {promisify} = require('../utils');

exports.fn = async (args) => {
    const [type, path] = args;
    switch(type) {
    case 'readFile':
        return readFilePT(path);
    case 'readFileSync':
        return readFileSyncPT(path);
    case 'require':
        return requirePT(path);
    case 'import':
        return importPT(path);
    default:
        return null;
    }
    
};
//http://localhost:8080/pathtraversal/readFile?payload=/etc/passwd
async function readFilePT(path) {
    return promisify(fs, fs.readFile)(path);
}
  
//http://localhost:8080/pathTraversal/readFileSync?payload=..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2Fetc%2Fpasswd
async function readFileSyncPT(path) {
    return fs.readFileSync(path);
}
  
//require
  
async function requirePT(path) {
    return require(path);
}

// import
async function importPT(path) {
    return import(path);
}

exports.moduleName = 'pathTraversal';