/* eslint-disable no-unused-vars */
const fs = require('fs');

const {promisify} = require('../utils');

exports.fn = async (args) => {
    const [type, file] = args;
    try {
        switch(type) {
        case 'fileReadAttack' :
            return fileReadAttack(file);
        case 'fileReadValid' :
            return fileReadValid(file);
        case 'fileReadAsyncAttack' :
            return fileReadAsyncAttack(file);
        case 'fileReadAsyncValid' :
            return fileReadAsyncValid(file);
        case 'fileWriteAttack' :
            return fileWriteAttack(file);
        case 'fileWriteValid' :
            return fileWriteValid(file);
        case 'fileWriteAsyncAttack' :
            return fileWriteAsyncAttack(file);
        case 'fileWriteAsyncValid' :
            return fileWriteAsyncValid(file);
        case 'fileIntegrityAttack' :
            return fileIntegrityAttack(file);
        case 'fileIntegrityValid' :
            return fileIntegrityValid(file);
        case 'fileIntegrityAsyncAttack' :
            return fileIntegrityAsyncAttack(file);
        case 'fileIntegrityAsyncValid' :
            return fileIntegrityAsyncValid(file);
        default:
        }
    } catch (err) {
        return `error in file operation - ${type}, ${file} : ${err}`;
    }
};

// file read attack
async function fileReadAttack(file) {
    const path = file;
    const buffer = fs.readFileSync(path);
    return buffer.toString();
}
  
// file read valid
async function fileReadValid(file) {
    const path = './temp.txt';
    const buffer = fs.readFileSync(path);
    return buffer.toString();
}
  
  
// file read async attack
async function fileReadAsyncAttack(file) {
    const path = file;
    const data = await promisify(fs, fs.readFile)(path, 'utf8');    
    return 'done';
}
  
// file read async valid
async function fileReadAsyncValid(file) {
    const path = './temp.txt';
    const data = await promisify(fs, fs.readFile)(path, 'utf8');    
    return 'done';
}

// file write attack
async function fileWriteAttack(file) {
    const path = file;
    const buffer = fs.writeFileSync(path);
    return 'File write attack done';
}
  
// file write valid
async function fileWriteValid(file) {
    const path = '/tmp/foo.txt';
    const buffer = fs.writeFileSync(path);
    return 'File write done';
}
  
// file write async attack
async function fileWriteAsyncAttack(file) {
    const path = file;
    await promisify(fs, fs.writeFile)(path, 'Hello K2 Cyber');    
    return 'File write attack done';
}
  
// file write async attack
async function fileWriteAsyncValid(file) {
    const path = '/tmp/foo.txt';
    await promisify(fs, fs.writeFile)(path, 'Hello K2 Cyber');    
    return 'File write done';
}
  
// file integrity attack
async function fileIntegrityAttack(file) {
    const path = './uploads/'+file;
    const buffer = fs.writeFileSync(path);
    return 'File integirty attack done';
}
  
// file integrity valid
async function fileIntegrityValid(file) {
    const path = './uploads/attack.txt';
    const buffer = fs.writeFileSync(path);
    return 'File integirty valid done';
}
  
// file integrity async attack
async function fileIntegrityAsyncAttack(file) {
    const path = './uploads/'+file;
    await promisify(fs, fs.writeFile)(path, 'Hello K2 Cyber');    
    return 'File integirty attack done';
}
  
// file integrity async vaid
async function fileIntegrityAsyncValid(file) {
    const path = './uploads/attack.txt';
    await promisify(fs, fs.writeFile)(path, 'Hello K2 Cyber');    
    return 'File integirty valid done';
}

exports.moduleName = 'file';