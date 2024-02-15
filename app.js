const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const addstocksRouter = require('./Routes/addstocks');

const app = express();

app.use(bodyParser.json());

app.use(addstocksRouter);


mongoose.connect(process.env.MONGODB_CREDENTIAL)
.then(()=>{
    app.listen(3000,()=>{
        console.log("running on port number 3000")
    })
})
.catch((err)=>{
    console.log("database connection failed");
})
