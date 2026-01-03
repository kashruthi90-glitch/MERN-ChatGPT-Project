const GptUser = require('../model/gptUserModel');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

async function loginUser(req, res) {
    const username = req.body.name;
    // check if the user is valid
    const user = await GptUser.find({name: username});

    if (!user.length) {
        res.status(401).send('Unauthorised user');
        return;
    }

    // check for password
    const enteredPassword = req.body.password;
    const match = await bcrypt.compare(enteredPassword, user[0].password);

    if(!match) {
        res.status(401).send('Invalid password');
        return;
    }

    // create jwt-token
    const token = await jsonwebtoken.sign({userId: user[0]._id, username: user[0].name}, process.env.JWT_TOKEN_SECRET);

    // set token as http only cookie
    res.cookie('token', token, {
        httpOnly: 'true',
        secure: false, // allow only for https - set to false as we are using http
        sameSite: 'strict', // avoid cross site request forgery attack
        maxAge: 3600000 // 1hr in millisecond
    });

    res.json({
        status: 'success',
        // token,
        userId: user[0]._id
    });
}

async function signinUser(req, res) {
    const { name, email, password } = req.body;
    // check for uniqueness in username
    const user = await GptUser.find({name});

    if (user.length) {
        // username exists then fail
        res.status(404).send('username already exist');
        return;
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    await GptUser.create({name, email, password: hashedPassword});
    res.json({
        status: 'success',
        message: 'successfully created user'
    });
}

module.exports = {
    loginUser,
    signinUser
}