const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config;
const cookieParser = require('cookie-parser');
const connectToDB = require('./model/db');
const loginRoutes = require('./routes/loginRoutes'); 
const chatRoutes = require('./routes/chatRoutes');

dotenv();

const app = express();

// Since token is set as httpOnly cookie, enable credentials in CORS settings else browser will reject the cookies
app.use(cors({
    origin: 'http://localhost:5173/',
    credentials: true
}));

// for http-only cookies 
app.use(cookieParser());

app.use(express.json());
app.use('/api/v1/login', loginRoutes);
app.use('/api/v1/chats', chatRoutes);

try {
    connectToDB().then(() => {
        app.listen(3000, () => console.log('Server is listening on port 3000...'));
    });
} catch(err) {
    console.log('failed to connect to DB');
}
