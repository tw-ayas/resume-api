
const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
// app.use(express.json())
app.use(helmet());
app.use(morgan('combined'));
const port = process.env.PORT || 3000;
const {Pool} = require('pg');


const {db_pool} = require('../lib/db');

db_pool.getInstance().query('SELECT endpoint_name, title FROM resume_endpoints WHERE is_active = true', (error, results) => {
    if (error) {
        console.log(error)
        console.log("No routes added")
    }
    else {
        const endpointName = (eName) => eName !== '' ? eName : 'apiIndex'
        results.rows.forEach((endpoint) => {
            try {
                app.use(`/api/v1/${endpoint.endpoint_name}`, routes[endpointName(endpoint.endpoint_name)])
            } catch (e) {
                console.error("\x1b[31m", `Route not found: ${endpointName(endpoint.endpoint_name)}. Create a route in routes.js`)
            }
        })
        results.rows.forEach((endpoint) => {
            try {
                app.use(`/api/${endpoint.endpoint_name}`, routes[endpointName(endpoint.endpoint_name)])
            } catch (e) {
                console.error("\x1b[31m", `Route not found: ${endpointName(endpoint.endpoint_name)}. Create a route in routes.js`)
            }
        })
    }
})

app.use("/api/v1/auth", routes.auth)
app.use("/api/auth", routes.auth)
app.use("/api/v1/refreshToken", routes.refreshToken)
app.use("/api/refreshToken", routes.refreshToken)
app.use("/api/v1/logout", routes.logout)
app.use("/api/logout", routes.logout)
app.use("/api/v1/user", routes.user)
app.use("/api/user", routes.user)
app.use("/api/v1/users", routes.users)
app.use("/api/users", routes.users)
app.use("/", routes.index)


app.use(function (err, req, res, next) {
    // res.status(500).send('Something broke!')
    // res.status(404).send('Not found!')
    if (err.status === 404)
        res.status(404).send({
            error: true,
            message: err.message
        })
    if (err.status === 500)
        res.status(500).send({
            error: true,
            message: err.message
        })
    next()
});

app.listen(port, () =>
    console.log(`Resume API is running on port: ${port}!`),
    console.log(`location: http://localhost:${port}`),
);


/*
app.get("/", (req, res) => {
   res.send({
      message: {
         title: "Hello world from Ayash!",
         description: "I am Ayash, a software engineer from Germany. I am currently working as a Full Stack Developer and a freelancer. I have received my Bachelor's in Computer Science Degree from the Technical University of Munich",
         api_endpoints: [
             '/api/v1/contact',
             '/api/v1/professional',
             '/api/v1/education',
             '/api/v1/interests',
             '/api/v1/skills',
         ],
      }
   });
});*/
