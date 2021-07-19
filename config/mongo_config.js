let mongoose = require('mongoose');

// replace the db path accordingly
const dbPath = 'mongodb://127.0.0.1:27017/test';
const options = {useNewUrlParser: true, useUnifiedTopology: true}
const mongo = mongoose.connect(dbPath, options);
module.exports = mongo;