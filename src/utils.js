function promisify (thisArg, fn) {
    return (...args) => new Promise((resolve, reject) => {
        args.push((err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
        fn.apply(thisArg, args);
    });
}


module.exports = {
    promisify
}