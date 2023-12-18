const express = require('express');
const {db_pool} = require('../../lib/db');
const bcrypt = require("bcrypt");
const { getAccessToken, getRefreshToken, validateToken} = require('./user/accessToken');

const router = express.Router();

router.get('/', (req, res) => {
    res.send({message: `User Endpoint needs an user_id!`})
});

router.get('/:id', validateToken, (req, res) => {
    console.log(req.params.id)
    console.log(req.user)
    res.send({message: `User!`})
});

router.post('/',  async (req, res) => {
    username = req.body.username;
    password = await bcrypt.hash(req.body.password, 10);
    email = req.body.email;
    firstname = req.body.firstname || "";
    lastname = req.body.lastname || "";

    db_pool.getInstance().query(`INSERT INTO users (username, password, email, firstname, lastname)
                                 VALUES ('${username}', '${password}', '${email}', '${firstname}', '${lastname}')`, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({error: true, message: "Internal server error"});
        } else {
            res.status(200).send({message: "User created"});
        }
    });
});

router.put('/:id', (req, res) => {
    firstname = req.body.firstname || "";
    lastname = req.body.lastname || "";
    db_pool.getInstance().query(`UPDATE users SET firstname='${firstname}', lastname='${lastname}' where username='${req.body.username}')`, (err, result) => {
        if (err){
            console.log(err);
            res.status(500).send({error: true, message: "Internal server error"});
        } else {
            res.status(200).send({message: "User updated"});
        }
    });
});
router.delete('/:id', (req, res) => {
    return res.send(req);
});


router.post('*', (req, res) => {
    res.status(404).send({error:true, message: 'Post Request found!'})
})
router.put('*', (req, res) => {
    res.status(404).send({error:true, message: 'Put Request found!'})
})
router.delete('*', (req, res) => {
    res.status(404).send({error:true, message: 'Delete request found!'})
})

module.exports = router;
