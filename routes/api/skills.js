const express = require('express');
const {Pool} = require("pg");
const dotenv = require("dotenv");
const {db_pool} = require('../../lib/db');
const {validateToken} = require("./user/accessToken");
dotenv.config();

const router = express.Router();

router.get('/', (req, res) => {
    db_pool.getInstance().query("SELECT * FROM resume_entries WHERE type = 'skills';", (error, results) => {
        if (error) {
            console.log(error)
        }
        return res.send({
            title: 'skills',
            description:'',
            data: results.rows,
        });
    });
});

router.get('/:id', (req, res) => {
    return res.send(req);
});
router.post('/', validateToken, (req, res) => {
    const {duration = '', title = '', subtitle = '', position = 0, place = '', description = {}} = req.body;
    const type = 'skills';

    db_pool.getInstance().query(`INSERT INTO resume_entries (type, duration, title, subtitle, position, place, description)
                                 VALUES ('${type}', '${duration}', '${title}', '${subtitle}', ${position}, '${place}', '${JSON.stringify(description)}')`, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({error: true, message: "Internal server error"});
        } else {
            res.status(200).send({message: "Entry added successfully", data: req.body});
        }
    });
});
router.put('/:id', validateToken, (req, res) => {
    const {id} = req.params;
    const columns = [duration, title, subtitle, position, place, description]
    const u = [];
    Object.entries(req.body).forEach(([key, value]) => {
        if (columns.includes(key))
            u.push(key === 'position' ? `${key}=${value}` : `${key}='${value}'`);
    });

    if (u.length === 0) {
        return res.status(400).send({error: true, message: "No valid fields to update"});
    }

    db_pool.getInstance().query(`UPDATE resume_entries SET ${u.join(', ')} WHERE entry_id=${id} AND type='skills'`, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({error: true, message: "Internal server error"});
        } else {
            res.status(200).send({message: "Entry added successfully", data: req.body});
        }
    });
});
router.delete('/:id', validateToken, (req, res) => {
    const {id} = req.params;
    if(!id) return res.status(400).send({error: true, message: "No id provided"});

    db_pool.getInstance().query(`DELETE FROM resume_entries WHERE entry_id=${id} AND type='skills'`, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({error: true, message: "Internal server error"});
        } else {
            res.status(200).send({message: "Entry added successfully", data: req.body});
        }
    });
});

router.post('*', (req, res) => {
    res.status(404).send({error:true, message: 'Route not found in skills!'})
})
router.put('*', (req, res) => {
    res.status(404).send({error:true, message: 'Route not found in skills!'})
})
router.delete('*', (req, res) => {
    res.status(404).send({error:true, message: 'Route not found in skills!'})
})

module.exports = router;
