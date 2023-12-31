// kết nối nodejs với mongodb
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    userID: { type: mongoose.Types.ObjectId, default: null },
    parentsID: { type: mongoose.Types.ObjectId, default: null },
    name: { type: String, require: true, unique: true },
    slug: { type: String, require: true, unique: true },
    avatar: { type: String, default: '' },
    price: { type: Number, default: 0 },
    description: { type: String, default: '' },
    content: { type: String, default: '' },
    sale:{type: Number, default:0},

    // thêm 1 số thuộc tính
    status: { type: Boolean, default: false },
    trash: { type: Boolean, default: false },
    date_created: { type: Date, default: Date.now() },
})

module.exports = mongoose.model('product', productSchema)