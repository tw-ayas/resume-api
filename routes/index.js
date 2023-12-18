const express = require('express');
const {db_pool} = require('../../lib/db');

const router = express.Router();

router.get('/', (req, res) => {
    res.send({message: "Base!"})
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

// router.post('*', (req, res) => {
//     res.status(404).send({error:true, message: ''})
// })
// router.put('*', (req, res) => {
//     res.status(404).send({error:true, message: ''})
// })
// router.delete('*', (req, res) => {
//     res.status(404).send({error:true, message: ''})
// })

module.exports = router;
