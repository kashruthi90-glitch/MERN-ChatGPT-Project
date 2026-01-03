const ChatModel = require('../model/chatDb');
const geminiAi = require('../controller/geminiAI');

// get all chats of the user
async function getAllUserChats(req, res) {
    const { userId } = req;
    const userChats = await ChatModel.find({user: userId}).populate('user', 'name').sort({updatedAt: -1});
    res.json({status: 'success', chats: userChats});
}

// create new chat
async function createNewChat(req, res) {
    const { userId } = req;
    try {
        const chat = await ChatModel.create({
            user: userId,
            message: []
        });
        res.json({status: 'success', message: 'chat created successfully', chatId: chat});
    } catch(err) {
        res.status(404).json({status: 'failed', message: 'failed to create chat'});
    }
}

// perform chat
async function performChat(req, res) {
    const { chatId, prompt, isImage = false } = req.body
    const chat = await ChatModel.find({_id: chatId});

    if (!chat.length) {
        res.status(404).send('invalid chatId');
        return;
    }

    const message = chat[0].message;
    let contentFromModel = '';
    if (isImage) {
        const imageData = await geminiAi.geminiGenerateImage(prompt);
        contentFromModel = `data:image/png;base64,${imageData}`;
    } else {
        contentFromModel = await geminiAi.geminiGenerateContent(prompt);
    }

    const chatData = {
        role: 'agent',
        isImage: isImage,
        content: contentFromModel,
        prompt
    };

    message.push(chatData);

    await chat[0].save();
    res.json({status: 'success', data: chatData});
    
}

// delete chat
async function deleteChat(req, res) {
    const { chatId } = req.body;
    try {
        await ChatModel.deleteOne({_id: chatId});
        res.send('deleted successfully');
    } catch(err) {
        res.status(500).send(err.message);
    }
    
}

module.exports = {
    getAllUserChats,
    createNewChat,
    performChat,
    deleteChat
}