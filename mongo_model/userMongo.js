const mongoose = require('mongoose');
//schema
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    passwordEncrypted: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('user', userSchema);
module.exports.get = function (callback, limit) {
   User.find(callback).limit(limit); 
}