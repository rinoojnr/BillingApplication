const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const addstocksRouter = require('./Routes/addstocks');
const viewStockRouter = require('./Routes/viewstocks');
const billingRouter = require('./Routes/billing');
const categoryRouter = require('./Routes/categories');

const app = express();

app.use(bodyParser.json());
app.use(cors({
    origin: "*",    
}));

app.use(addstocksRouter);
app.use(viewStockRouter);
app.use(billingRouter);
app.use(categoryRouter);


mongoose.connect(process.env.MONGODB_CREDENTIAL)
.then(()=>{
    app.listen(3000,()=>{
        console.log("running on port number 3000")
    })
})
.catch((err)=>{
    console.log("database connection failed");
})
