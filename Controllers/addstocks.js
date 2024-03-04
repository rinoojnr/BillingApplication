const Stocks = require('../Models/stocks');
const Category = require('../Models/category');

//ADD STOCK ITEM
exports.addStcoksitem = async(req,res) =>{
    const { item_name,item_quantity,item_mrp,item_srp,item_category,item_expiry } = req.body;
    const createdDate = new Date();
    const userSaving = item_mrp - item_srp;
    const checkCategory = await Category.findOne({ item_category });
    if(!checkCategory){
        Category.create({ item_category})
        .then((result)=>{
            const item_category = result._id;
            Stocks.create({ item_name,item_quantity,item_mrp,item_srp,item_category,item_expiry,user_saving: userSaving,item_added: createdDate })
            .then(()=>{
                res.status(200).json({success: true});
            })
        }) 
        .catch((err)=>{
            res.status(400).json({success: false,message: err.message});
        });
    }else{
        const item_category = checkCategory._id
        Stocks.create({ item_name,item_quantity,item_mrp,item_srp,item_category,item_expiry,user_saving: userSaving,item_added: createdDate })
            .then(()=>{
                res.status(200).json({success: true});
            })
    }
    
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
exports.editStockitem = async(req,res) =>{
    const { item_name,item_quantity,item_mrp,item_srp,item_category,item_expiry } = req.body;
    console.log(item_category,"cat")
    const checkItemCategory = await Category.findOne({ item_category });
    console.log(checkItemCategory,"check")
    
        Stocks.findById(req.params._id)
        .then((result)=>{
            result.updatedAt = new Date();
            result.item_name = item_name;
            result.item_quantity = item_quantity;
            result.item_mrp = item_mrp;
            result.item_srp = item_srp;
            if(checkItemCategory){
                result.item_category = checkItemCategory.item_category;
                console.log(checkItemCategory.item_category,"inif")
            }else{
                Category.create({ item_category })
                .then((response)=>{
                    result.item_category = response.item_category;
                    console.log(response.item_category,"else")
                })
            }
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