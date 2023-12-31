const express = require("express")
const app = express()
const path = require("path")
// const cors = require('cors');
const bodyParser = require('body-parser');

// app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.urlencoded({ extended: true }));


app.set("view engine", "ejs");
app.use(express.json())
app.use(express.static(__dirname + "views"))

// Enable CORS for all routes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

//controller
const userRouter = require('./routes/user')
const studentRouter = require('./routes/student')

app.use('/studentVault/v1/users', userRouter)
app.use('/studentVault/v1/students', studentRouter)

module.exports = app;