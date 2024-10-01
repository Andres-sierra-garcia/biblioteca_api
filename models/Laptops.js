const mongoose = require('mongoose')
const laptopSchema = new mongoose.Schema({
    holder:{type:mongoose.Schema.Types.ObjectId, ref:'holder', required:true},
    serial:{type:String, required:true, unique:true},
    qrcode:{type:String, required:true, unique:true},
    state:{type:String, default:1},
    observations:{type:String},
},{
    timestamps:true
})

module.exports = mongoose.model('Laptop', laptopSchema)