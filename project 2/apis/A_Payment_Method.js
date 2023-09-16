const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')


const ObjectId = mongoose.Types.ObjectId;


// goi model

const M_Payment_Method = require('../models/M_Payment_Method')

router.get('/getList', async (req, res) =>{
    const data = await M_Payment_Method.find({}).exec()
    res.send({
        code: 200,
        message: 'Success',
        data
    })
})

router.get('/add', async (req, res) =>{
    const name = req.body.name 
    const fee = req.body.fee;
    const object = {}
    object['name'] = name;

    if(fee != undefined) object['fee'] = parseInt(fee)
    const data = await M_Payment_Method.create(object)
    res.send({
        code: 200,
        message: 'Success',
        data
    })
})

router.get('/delete', async (req, res) =>{
    const data = await M_Payment_Method.deleteMany()
    res.send({
        code: 200,
        message: 'Success',
        data:{
            title: 'Đã xoá tất cả dữ liệu',
            listData: data
        }
    })
})

module.exports = router
