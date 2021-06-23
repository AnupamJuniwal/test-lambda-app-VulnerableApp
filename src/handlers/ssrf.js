const axios = require('axios');
const request = require('request');

const {promisify} = require('../utils');

exports.fn = async (args) => {
    const [type, url] = args;
    switch(type) {
    case 'request':
        return requestSSRF(url);
    case 'axios':
        return axiosSSRF(url);
    default:
        return null;
    }
    
};
async function requestSSRF(endpoint) {
    let url = 'http://' + endpoint;
    return promisify(null, request)(url);
}
  
// axios
async function axiosSSRF(endpoint) {
    let url = 'http://' + endpoint;
    return axios.get(url);
}

exports.moduleName = 'ssrf';