/* eslint-disable no-unused-vars */
const _ = require('lodash');

const importModules = [
    require('./cmd'),
    require('./ws'),
    require('./aws-sdk'),
    require('./re-invoke-self'),
    require('./rci'),
    require('./ssrf'),
    require('./xss'),
    require('./path-traversal'),
    require('./late-reply'),
    require('./file'),
    require('./ldap'),
    require('./nosqli'),
    require('./sqli'),
    require('./xpath-injection'),
    require('./ftp'),
];

const modules = _.reduce(importModules, (acc, mod, index) => {
    acc[mod.moduleName] = mod;
    return acc;
}, {});


exports.handler = async (event, context) => {
    let result;
    try{
        if(event.headers && event.headers['Content-Type'] === 'application/json' ||
            event.headers && event.headers['content-type']  === 'application/json' && 
            event.body) {
            event.body = JSON.parse(event.body);
        }
        if (!event.body || !event.body.runner) {
            throw new Error('Please specify a runner');
        }
        const modl = modules[event.body.runner];
        result = await modl.fn(event.body.args);
    } catch (err) {
        result = err;
    }
    const body = typeof (result || '') === 'object' 
        ? JSON.stringify(result)
        : (result || '').toString();
    return {
        'statusCode': 200,
        body
    };
};