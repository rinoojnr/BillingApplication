const Stocks = require('../Models/stocks');
const Bill = require('../Models/bill');

exports.modifiedStock = async(req,res) =>{
    try{
        const itemAndQuantity = [];
        const items = req.body;
        let promises = [];
        items.forEach(async(i)=>{
            promises.push(Stocks.findByIdAndUpdate(i._id,{$inc: {item_quantity: - i.item_quantity }}));
            itemAndQuantity.push({ item_id: i._id,item_quantity: i.item_quantity})
        })
        promises.push(Bill.create({ item_idandqty: itemAndQuantity,status: 'Finished',time: new Date() }));

        Promise.all(promises)
        .then((result)=>{
            res.status(200).json({success: true, message: "updated stocks"});
        })
        
    }catch(err){
        res.status(401).json({success: false, message: "updated stocks failed"});

    }
}