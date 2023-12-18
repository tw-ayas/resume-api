const express = require('express');
const {db_pool} = require('../../lib/db');

const router = express.Router();

router.get('/', (req, res) => {
    db_pool.getInstance().query('SELECT endpoint_name, title FROM resume_endpoints WHERE is_active = true', (error, results) => {
        if (error) {
            console.log(error)
        }
        return res.send({
            title: "Education",
            description: "",
            endpoints: results.rows
        });
    })
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
