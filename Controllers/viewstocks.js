const Stocks = require('../Models/stocks');

exports.viewStock = (req,res) =>{
    Stocks.find().then((response)=>{
        res.status(200).json({success: true,message: "fetched all stocks",stocks: response});
    })
    .catch((err)=>{
        re.status(400).json({success: false, message: "fetching stocks failed"});
    })
}

// exports.filter = (req,res) =>{

// }