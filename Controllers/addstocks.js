const Stocks = require('../Models/stocks');

exports.addStcoksitem = (req,res) =>{
    const { item_name,item_quantity,item_mrp,item_srp,item_category,item_expiry } = req.body;

    const expiryDate = new Date();
    const createdDate = new Date();

    Stocks.create({ item_name,item_quantity,item_mrp,item_srp,item_category,item_expiry: expiryDate,item_added: createdDate })
    .then(()=>{
        res.status(200).json({success: true})
    })
    .catch((err)=>{
        res.status(400).json({success: false,message: err.message})
    })
    
}