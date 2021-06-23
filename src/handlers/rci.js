
exports.fn = async (args) => {
    const [payload] = args;
    console.log('RCI Payload:', payload);
    eval(payload);
    return 'RCI done';
};

exports.moduleName = 'rci';