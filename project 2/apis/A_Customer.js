const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')


const ObjectId = mongoose.Types.ObjectId;

// goi model 
const M_Customer = require('../models/M_Customer')


router.post('/add', async (req, res) =>{
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const address = req.body.address;
    const note = req.body.note;


    const object = {}

    object['email'] = email;
    object['phone'] = phone; 
    
    

    if(address != undefined) object['address'] = address
    if(name != undefined) object['name'] = name
    if(note != undefined) object['note'] = note

    const check =  await M_Customer.find({
        $or: [{email}, {phone}]
    }).select('_id').limit(1).exec();
    

    if(check.length > 0){
        res.send({
            code: 200,
            message: "Success",
            data: check[0]._id
        })
        return
    }

    const data = await M_Customer.create(object)

    res.send({
        code: 200,
        message: 'Success',
        data: data._id
    })

})
router.get('/getList', async (req, res) => {
    const data = await M_Customer
      .find({}, {
        name: 1, 
        phone: 1, 
        address: 1, 
        note: 1
      })
      .exec();
  
    res.send({
      message: 'Success', 
      code: 200, 
      data
    })
  })


module.exports = router