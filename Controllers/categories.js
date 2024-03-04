const Category = require('../Models/category');

exports.getCategories = (req,res) =>{
    Category.find().select('item_category _id')
    .then((result)=>{
        res.status(200).json({ successs: true, categories: result })
    })
    .catch((err)=>{
        res.status(400).json({ success: false })
    })
}
