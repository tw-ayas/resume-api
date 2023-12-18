const express = require('express');
const {db_pool} = require('../../lib/db');

const router = express.Router();

router.get('/', (req, res) => {
    res.send({message: "ApiHome!"})
});

router.post('/:id', (req, res) => {
    return res.send(req);
});
router.put('/:id', (req, res) => {
    return res.send(req);
});
router.delete('/:id', (req, res) => {
    return res.send(req);
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
