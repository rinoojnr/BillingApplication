const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const billSchema = new Schema({
    item_idandqty: [{ 
        item_id: { type: Schema.Types.ObjectId,ref: 'stocks'},
        item_quantity: Number
    }],
    status: {
        type: Boolean,
        default: 'false',
        required: true
    },
    time: {
        type: Date,
        require: true
    }
});


module.exports = mongoose.model('bill',billSchema);
