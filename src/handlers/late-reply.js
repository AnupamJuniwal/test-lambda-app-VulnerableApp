/* eslint-disable no-undef */

const sleep = (timeout) => new Promise((resolve) => {
    setTimeout(resolve, timeout);
});

exports.fn = async (args) => {
    const delay = (args && args[0]) || 20000;
    await sleep (delay);
    const now = Date.now();
    return {
        start: now - delay,
        now,
        delay
    };
};
exports.moduleName = 'lateReply';