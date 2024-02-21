const Stocks = require('../Models/stocks');

exports.modifiedStock = (req,res) =>{
    const items = req.body;
    items.forEach((i)=>{
        Stocks.findByIdAndUpdate(i._id,{$inc: {item_quantity: - i.item_quantity }})
        .then((result)=>{
            res.status(200).json({success: true, message: "updated stocks"});
        })
        .catch((err)=>{
            res.status(401).json({success: false, message: "updated stocks failed"});
        })
    })

}