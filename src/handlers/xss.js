
exports.fn = async (args) => {
    const [payload] = args;
    console.log('payload for xss is ::', payload);
    if (payload === '' || payload === undefined) {
        throw new Error('Expecting query parameter -paylaod- with some value');
    } else {
        const html = '<!DOCTYPE html><html><head><title>XSS</title></head><body>' + payload + '</body></html>';
        return html;
    }
};

exports.moduleName = 'xss';