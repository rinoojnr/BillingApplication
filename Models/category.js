const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const categorySchema = new Schema({
    item_category: {
        type: String,
        required: true,
        uppercase: true
    }
});



module.exports = mongoose.model('Categories',categorySchema);


