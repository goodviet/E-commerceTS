// kết nối nodejs với mongodb
const mongoose = require('mongoose');

mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://phanminh:phanminhdat11@cluster0.jxjisrt.mongodb.net/mean19112022?retryWrites=true&w=majority')
    .then(() => console.log('Kết nối DB thành công!'))
    .catch(() => console.log('Kết nối thất bại!'))