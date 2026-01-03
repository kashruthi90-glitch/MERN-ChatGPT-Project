const mongoose = require('mongoose');

const gptUserSchema = new mongoose.Schema({
    name: {type: String, unique: true},
    email: String,
    password: String
});

const GptUser = mongoose.model('GptUser', gptUserSchema);

module.exports = GptUser;