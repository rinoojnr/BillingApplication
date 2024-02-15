const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stocksSchema = new Schema({
    item_name: {
        type: String,
        required: true
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
        type: String,
        required: true
    },
    item_added: {
        type: Date,
        required: true
    },
    item_expiry: {
        type: Date,
        required: true
    }

});


module.exports = mongoose.model('stocks',stocksSchema);

