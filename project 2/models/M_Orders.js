// kết nối nodejs với mongodb
const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    idCustomer: {type:mongoose.Types.ObjectId, default:null},
    idDeliveryMethod:{type:mongoose.Types.ObjectId, default:null},
    idPatmentMethod:{type:mongoose.Types.ObjectId, default:null},
    detail:{type: String, default:''},
    somTotal:{type:Number, default:0},


    // thêm 1 số thuộc tính
    status: { type: Boolean, default: false },
    trash: { type: Boolean, default: false },
    date_created: { type: Date, default: Date.now() },
})

module.exports = mongoose.model('order', orderSchema)