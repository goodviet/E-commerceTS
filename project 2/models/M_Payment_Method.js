// kết nối nodejs với mongodb
const mongoose = require('mongoose');

const paymentMethodSchema = mongoose.Schema({
    name: {type: String, require: true, unique: true},
    fee:{ type: Number, default: ''},
    status:{type: Boolean, default: true}
})

module.exports = mongoose.model('payment_method', paymentMethodSchema)