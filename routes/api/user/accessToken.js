const jwt = require("jsonwebtoken");
const {db_pool} = require('../../../lib/db');

let refreshTokens = [];

const getAccessToken = (username) => {
    return jwt.sign({username: username}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1m'});
}

const getRefreshToken = (username) => {
    const token = jwt.sign({username: username}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '2m'});
    refreshTokens.push(token);
    return token;
}

function validateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) {
            console.error({error: err.message});
            return res.sendStatus(403)
        }
        req.user = user;
        next();
    })
}

function refreshToken(token){
    if(!refreshTokens.includes(token)) return res.sendStatus(403);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);
        const accessToken = getAccessToken(user.username);
        const refreshToken = getRefreshToken( user.username);
        return {accessToken: accessToken, refreshToken: refreshToken};
    })
}

function logout(){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) return res.sendStatus(401);

    if(!refreshTokens.includes(token)) return res.sendStatus(403);

    refreshTokens = refreshTokens.filter((t) => t !==token);
    return true;
}

module.exports = {
    getAccessToken,
    getRefreshToken,
    logout,
    refreshToken,
    validateToken
}