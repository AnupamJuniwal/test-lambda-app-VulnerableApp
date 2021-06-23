/* eslint-disable no-undef */

const fs = require('fs');
const path = require('path');
const ftp = require('basic-ftp');

const ftpClient = new ftp.Client();

exports.fn = async (args) => {
    const [fileOnServer, localDirectory, config] = args;
    const localFilePath = path.join(localDirectory, fileOnServer);
    await downloadFile(fileOnServer, localFilePath, config);
    const stats = checkFile(localFilePath);
    return stats;
};

function checkFile(localFilePath) {
    return fs.statSync(localFilePath);
}

async function downloadFile (filename, outputFile, config) {
    try {
        console.log('FTP host:', config.host);
        await ftpClient.access(config);
    } catch (error) {
        console.log('Error occured in FTP:', error);
        ftpClient.close();
    }
    try {
        console.log('FTP client ready state');
        const sizeInBytes = await ftpClient.size(filename);
        ftpClient.trackProgress(info => {
            const completePercent = (info.bytesOverall / sizeInBytes * 100).toFixed(2);
            console.log(`FTP Download progress: ${completePercent}%`);
        });
        await ftpClient.downloadTo(outputFile, filename);
        // disable tracking
        ftpClient.trackProgress();
        console.log(filename, ' downloaded successfully');
        return true;
    } catch (err) {
        console.log(`unable download ${filename} from ftp`);
        return false;
    } finally {
        if (!ftpClient.closed) {
            ftpClient.close();
        }
    }
}

exports.moduleName = 'ftp-check';