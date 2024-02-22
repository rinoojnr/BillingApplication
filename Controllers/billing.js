const Stocks = require('../Models/stocks');
const Bill = require('../Models/bill');

exports.modifiedStock = async(req,res) =>{
    try{
        const itemAndQuantity = [];
        const items = req.body;
        let promises = [];

        const updated = items.map((i)=>{
            itemAndQuantity.push({ item_id: i._id,item_quantity: i.item_quantity})
            return {
                updateOne: {
                    filter: { _id: i._id },
                    update: {$inc: {item_quantity: -i.item_quantity}}
                }
            }
        });

        promises.push(Stocks.bulkWrite(updated));
        promises.push(Bill.create({ item_idandqty: itemAndQuantity,status: true,time: new Date() }));

        Promise.all(promises)
        .then((result)=>{
            res.status(200).json({success: true, message: "updated stocks"});
        });
        
    }catch(err){
        res.status(401).json({success: false, message: "updated stocks failed"});

    }
}

exports.darftBill = (req,res)=>{
    const items = req.body;
    const itemAndQuantity = [];
    items.forEach((i)=>{
        itemAndQuantity.push({ item_id: i._id,item_quantity: i.item_quantity })
    });
    Bill.create({ item_idandqty: itemAndQuantity,status: false,time: new Date() })
    .then((result)=>{
        res.status(200).json({ success: true, message: "bill drafted successfully" });
    })
    .catch((err)=>{
        res.status(400).json({ success: false, message: "bill drafting failed" });
    })
}