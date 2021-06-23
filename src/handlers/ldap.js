const ldapjs = require('ldapjs');

const ldapOptions = {
    url: `ldap://${process.env['LDAP_HOST']}:1389`,
    timeout: 30000,
    connectTimeout: 30000,
    reconnect: true
};

exports.fn = async (args) => {
    const [username] = args;
    const ldapClient = ldapjs.createClient(ldapOptions);
    await new Promise( (resolve, reject) => {
        ldapClient.bind(
            'cn=root',
            'secret',
            err => {
                if (err) return reject(err);
                resolve();
            });
    });
  
    const opts = {
        filter: '(&(uid=' + username + '))',
  
        attributes: ['cn', 'uid', 'gid', 'description', 'homedirectory', 'shell'],
    };

    const res = await new Promise( (resolve, reject) => {
        ldapClient.search('o=myhost', opts, (err, res1) => {
            if (err) return reject(err);
            const entries = [];
            res1.on('searchEntry', function (entry) {
                const r = entry.object;
                entries.push(r);
            });
  
            res1.on('error', function (err) {
                reject(err);
            });
  
            res1.on('end', function (result) {
                if (entries.length == 0)
                    resolve('invalid Uid');
                else{
                    resolve(entries);
                }
            });
  
  
        });
    });
    return res;
};

exports.moduleName = 'ldap';