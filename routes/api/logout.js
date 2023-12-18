const express = require('express');
const {db_pool} = require('../../lib/db');
const {validateToken, logout} = require("./user/accessToken");
const bcrypt = require("bcrypt");

const router = express.Router();

router.get('/', validateToken, (req, res) => {
    if (logout())
    res.send({message: `Already authenticated! for ${req.user.user}`});
});

router.post('/', (req, res) => {
    res.status(404).send({error:true, message: 'Incorrect route!'})
});
router.put('/auth', (req, res) => {
    res.status(404).send({error:true, message: 'Incorrect route!'})
});
router.get('/auth', (req, res) => {
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
