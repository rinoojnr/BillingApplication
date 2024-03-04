const Stocks = require('../Models/stocks');
const Bill = require('../Models/bill');
const bill = require('../Models/bill');

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

exports.darftBill = (req,res) =>{
    const items = req.body.idAndQtyArray;
    const itemAndQuantity = [];
    items.forEach((i)=>{
        itemAndQuantity.push({ item_id: i._id,item_quantity: i.item_quantity })
    });
    Bill.create({ item_idandqty: itemAndQuantity,status: false,time: new Date(),name: req.body.name, phone: req.body.phone })
    .then((result)=>{
        res.status(200).json({ success: true, message: "bill drafted successfully" });
    })
    .catch((err)=>{
        res.status(400).json({ success: false, message: "bill drafting failed" });
    });
}


exports.viewDraft = (req,res) =>{
    Bill.find({status: false}).select('_id name phone time')
    .then((result) =>{
        res.status(200).json({ success: true, message: "fetched all detatiles", billholders: result})
    })
    .catch((err) =>{
        res.status(400).json({ success: false, message: "fetching failed" })
    });
}

exports.viewDraftBill = (req,res) =>{
    Bill.findById(req.params._id).select('-__v').populate('item_idandqty.item_id')
    .then((result) =>{
        res.status(200).json({ status: 200, message: "fetched all detatiles", billingdetailes: result });
    })
    .catch((err) =>{
        res.status(400).json({ success: false, message: "fetching failed" })
    });
}
