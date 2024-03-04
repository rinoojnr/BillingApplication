const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stocksSchema = new Schema({
    item_name: {
        type: String,
        required: true,
        uppercase: true
    },
    item_quantity: {
        type: Number,
        required: true
    },
    item_mrp: {
        type: Number,
        required: true
    },
    item_srp: {
        type: Number,
        required: true
    },
    item_category: {
        type: Schema.Types.ObjectId,
        ref: 'Categories'
    },
    item_added: {
        type: Date,
        required: true
    },
    item_expiry: {
        type: Date,
        required: true
    },
    user_saving: {
        type: Number
    },
    updatedAt: {
        type: Date,
        default: null
    }

});


module.exports = mongoose.model('stocks',stocksSchema);

