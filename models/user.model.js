const { required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// User name and password with salt and hash is provided by passportLocalMongoose
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);