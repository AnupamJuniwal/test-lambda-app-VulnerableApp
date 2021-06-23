const Mongoose = require('mongoose');
Mongoose.Promise = global.Promise;

const Document = Mongoose.model('Document', {
    title: {
        type: String,
        unique: true
    },
    type: String
});

let entryDone = false;

const { documents: docs } = require('../data');

exports.fn = async (args) => {
    const query = {};
    const [type, title] = args;
    try {
        await Mongoose.connect(process.env['MONGO_URI']);

        // push docs
        if (!entryDone) {
            const promises = [];
            for (const doc of docs) {
                promises.push(Document.findOneAndUpdate(doc, doc, {upsert: true}));
            }
            await Promise.all(promises);
            entryDone = true;
        }
        if (type === 'secret projects') { // I don't want people to discover my secret projects,
            // it would be a shame is 'client.js' contained a method to show all the content of the collection here...
            return [];
        }
        if (title) {
            query.title = title;
        }
        if (type) {
            query.type = type;
        }
        if (!query.title && !query.type) {
            return res.json([]);
        }

        const res = await Document.find(query).exec();
        return res;
    } catch (err) {
        return err;
    }
};

exports.moduleName = 'nosqli';