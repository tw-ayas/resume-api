const express = require('express');
const {db_pool} = require('../../lib/db');
const {validateToken, refreshToken} = require("./user/accessToken");
const bcrypt = require("bcrypt");

const router = express.Router();

router.get('/', validateToken, (req, res) => {
    res.send({message: `Already authenticated! for ${req.user.user}`});
});

router.post('/', (req, res) => {
    const token = req.body.token;

    if(!token) return res.status(401).send({error: true, message: "Access denied, token missing!"});

    return res.send({...refreshToken(token)})
});
router.put('/', (req, res) => {
    res.status(404).send({error:true, message: 'Incorrect route!'})
});
router.get('/', (req, res) => {
    res.status(404).send({error:true, message: 'Incorrect route!'})
});

router.post('*', (req, res) => {
    res.status(404).send({error:true, message: 'Not found!'})
})
router.put('*', (req, res) => {
    res.status(404).send({error:true, message: 'Not found!'})
})
router.delete('*', (req, res) => {
    res.status(404).send({error:true, message: 'Not found!'})
})

module.exports = router;
