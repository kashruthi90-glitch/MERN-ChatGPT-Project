const jsonwebtoken = require('jsonwebtoken');
const GptUser = require('../model/gptUserModel');

async function protectedRoute(req, res, next) {
    const authorization = req.headers.authorization;
    // const token = authorization.split(' ')[1]; // if cookie is sent in the authorisation header
    const token = req.cookies.token; // if cookie is sent http-only cookie
    console.log('recieved ', token);
    // validate token
    if (!token) {
        res.status(401).send('unauthorised user');
        return;
    }

    jsonwebtoken.verify(token, process.env.JWT_TOKEN_SECRET, async (err, decoded) => {
        if (err) {
            res.status(401).send('unauthorised user');
            return;
        }
        const { userId } = decoded;
        const user = await GptUser.find({_id: userId});

        if (!user.length) {
            // invalid user
            res.status(404).send('Invalid user');
            return;
        }

        req.userId = user[0]._id;
        req.username = user[0].name;
        next();
    });
}

module.exports = protectedRoute;