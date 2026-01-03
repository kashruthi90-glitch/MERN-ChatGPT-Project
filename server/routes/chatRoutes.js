const express = require('express');
const chatController = require('../controller/chatController');
const protectedRoute = require('../middleware/protectedRoute');

const router = express.Router();

router.get('/allChats', protectedRoute, chatController.getAllUserChats);
router.post('/newChat', protectedRoute, chatController.createNewChat);
router.post('/chat', protectedRoute, chatController.performChat);
router.delete('/chat', protectedRoute, chatController.deleteChat);

module.exports = router;