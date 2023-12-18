const express = require('express');
const {db_pool} = require('../../lib/db');

const router = express.Router();

router.get('/', (req, res) => {
    res.send({message: "ApiHome!"})
});

router.post('/', (req, res) => {
    return res.sendStatus(403);
});
router.put('/', (req, res) => {
    return res.sendStatus(403);
});
router.delete('/', (req, res) => {
    return res.sendStatus(403);
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
