const xmldom = require('xmldom');
const xpath = require('xpath');
const data = '<?xml version="1.0" encoding="UTF-8"?>\
<users>\
   <user>\
      <id>1</id>\
      <username>admin</username>\
      <password>xpath</password>\
   </user>\
   <user>\
      <id>2</id>\
      <username>test</username>\
      <password>test987</password>\
   </user>\
   <user>\
      <id>3</id>\
      <username>bigolnerd</username>\
      <password>nerdsneedlovetoo</password>\
   </user>\
</users>';

exports.fn = async (args) => {
    const parser = new xmldom.DOMParser();
    const [username, password] = args;

    try {
        const root = parser.parseFromString(data, 'text/xml');
        const query = '//users//user[username=\'' + username + '\' and password=\'' + password + '\']';
        const nodes = xpath.select(query, root);
        if (nodes.toString() != 0) {
            return 'done';
        }
    } catch (err) {
        return 'Username or Password are incorrect';
    }
};

exports.moduleName = 'xpath';