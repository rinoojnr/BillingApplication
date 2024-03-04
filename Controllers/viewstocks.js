const Stocks = require('../Models/stocks');

exports.viewStock = (req,res) =>{
    Stocks.find().sort({item_added: -1}).populate({path: 'item_category',select: 'item_category'}).then((response)=>{
        res.status(200).json({success: true,message: "fetched all stocks",stocks: response});
    })
    .catch((err)=>{
        res.status(400).json({success: false, message: "fetching stocks failed"});
    })
}

exports.viewStockForSelect = (req,res) =>{
    Stocks.find().sort({item_name: 1}).then((response)=>{
        res.status(200).json({success: true,message: "fetched all stocks",stocks: response});
    })
    .catch((err)=>{
        res.status(400).json({success: false, message: "fetching stocks failed"});
    })
}

// exports.filter = (req,res) =>{

// }

exports.viewOne = (req,res) =>{
    Stocks.findOne({_id: req.params.id}).populate('item_category')
    .then((response)=>{
        res.status(200).json({success: true,message: "stock item fetched",item: response});
    })
    .catch((err)=>{
        res.status(400).json({success: false,message: "fetching failed"});
    })
}