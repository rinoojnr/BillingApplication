const Stocks = require('../Models/stocks');

//ADD STOCK ITEM
exports.addStcoksitem = (req,res) =>{
    const { item_name,item_quantity,item_mrp,item_srp,item_category,item_expiry } = req.body;
    const createdDate = new Date();
    const userSaving = item_mrp - item_srp;
    Stocks.create({ item_name,item_quantity,item_mrp,item_srp,item_category,item_expiry,user_saving: userSaving,item_added: createdDate })
    .then(()=>{
        res.status(200).json({success: true});
    })
    .catch((err)=>{
        res.status(400).json({success: false,message: err.message});
    });
}

//DELETE STOCK ITEM
exports.deleteStockitem = (req,res) =>{
    Stocks.deleteOne({_id: req.params._id})
    .then(()=>{
        res.status(200).json({success: true,message: "stock item deleted"});
    })
    .catch((err)=>{
        res.status(400).json({success: false,message: "stock item deleting fails"});
    })
}

//EDIT STOCK ITEM
exports.editStockitem = (req,res) =>{
    const { item_name,item_quantity,item_mrp,item_srp,item_category,item_expiry } = req.body;
    Stocks.findById(req.params._id)
    .then((result)=>{
        result.updatedAt = new Date();
        result.item_name = item_name;
        result.item_quantity = item_quantity;
        result.item_mrp = item_mrp;
        result.item_srp = item_srp;
        result.item_category = item_category;
        result.item_expiry = item_expiry;
        result.user_saving = item_mrp - item_srp;
        result.save();
        res.status(200).json({success: true,message: "edited successfully"})
    })
}


//SEARCH 
exports.searchItems = async (req,res) =>{
    Stocks.find(
        {
            "$or": [
                {item_category: {$regex: req.params.search,$options: 'i'}},
                {item_name: {$regex: req.params.search,$options: 'i'}}

            ]
        }
    )
    .then((result)=>{
        res.status(200).json(result)
    })
}