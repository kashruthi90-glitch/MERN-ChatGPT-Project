const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'GptUser' }, // mention model name as ref
    message: [
        {
            role: {type: String, default: 'user'},
            isImage: {type: Boolean, default: false},
            content: {type: String},
            prompt: {type: String}
        }
    ],
}, {timestamps: true}); // automatically add createdAt and updatedAt fields

const ChatModel = mongoose.model('ChatModel', chatSchema);

module.exports = ChatModel;