const {exec, execSync, spawn, spawnSync} = require('child_process');

const {promisify} = require('../utils');

/**
 * A simple example includes a HTTP get method to get output of a system command.
 */
exports.fn = async (args) => {
    const [type, cmd, ...extraargs] = args;
    switch(type) {
    case 'exec':
        return execRCE(cmd);
    case 'execSync':
        return execSyncRCE(cmd);
    case 'spawn':
        return spawnRCE(cmd, extraargs);
    case 'spawnSync':
        return spawnSyncRCE(cmd, extraargs);
    default:
        return null;
    }
};

// exec call
async function execRCE(kmd) {
    return promisify(null, exec)(kmd);
}
  
// execSync call
async function execSyncRCE(kmd) {
    return execSync(kmd).toString();
}
  
// spawn call
async function spawnRCE(kmd, args) {
    return new Promise((resolve, reject) => {
        const command = spawn(kmd, args);
        command.on('error', (err) => {
            reject(err);
        });
        command.stdout.on('data', (data) => {
            resolve(data);
        });
    });
}
  
// spawnSync call
async function spawnSyncRCE(kmd, args) {
    return spawnSync(kmd, args).stdout.toString();
}

exports.moduleName = 'exec';
