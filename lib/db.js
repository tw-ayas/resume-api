"use strict";
const {Pool} = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const poolConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432, // default Postgres port
    database: process.env.DB_NAME,
};

class db_pool{
    static __instance;

    constructor() { }

    static getInstance() {
        if (!db_pool.__instance) {
            db_pool.__instance = new Pool(poolConfig);
        }
        return db_pool.__instance;
    }
}

module.exports = {
    db_pool
}