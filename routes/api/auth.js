const express = require('express');
const {db_pool} = require('../../lib/db');
const {validateToken, getAccessToken, getRefreshToken} = require("./user/accessToken");
const bcrypt = require("bcrypt");

const router = express.Router();

router.get('/', validateToken, (req, res) => {
    res.send({message: `Already authenticated! for ${req.user.user}`});
});

router.post('/', (req, res) => {
    username = req.body.username
    password = req.body.password

    db_pool.getInstance().query(`SELECT * FROM users WHERE username='${username}'`, async (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({error: true, message: "Internal server error"});
        } else {
            if (result.rows.length === 0) {
                res.status(404).send({error: true, message: "User not found"});
            } else {
                if (await bcrypt.compare(password, result.rows[0].password)) {
                    const accessToken = getAccessToken(username)
                    const refreshToken  = getRefreshToken(username)
                    res.status(200).send({message: "User authenticated", accessToken: accessToken, refreshToken: refreshToken});
                } else {
                    res.status(401).send({error: true, message: "Incorrect password"});
                }
            }
        }
    });
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
