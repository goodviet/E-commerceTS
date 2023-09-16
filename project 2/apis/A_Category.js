const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;

// Gọi controllers
const C_Admin = require('../controllers/C_Admin')
const use_C_Admin = new C_Admin()

// Gọi Models
const M_Category = require('../models/M_Category')
const M_Product = require('../models/M_Product')

// getList
router.get('/getList', async (req, res) => {
  const data = await M_Category
    .find({}, {
      name: 1, 
      slug: 1, 
      status: 1, 
      parentsID: 1,
      avatar:1
    })
    .exec();

  res.send({
    message: 'Success', 
    code: 200, 
    data
  })
})



//getListParent
router.get('/getParent', async(req, res) => {
  const data = await M_Category.aggregate([
    {$match: {parentsID: null}},
    {
      $project: { // same select
        _id: 1,
        name: 1,
        slug: 1,
        status: 1,
        parentsID: 1,
        avatar: 1
      }
    },
  ]).exec()
  res.send({
    message: 'Success', 
    code: 200, 
    data
  })

})


// getListParent and Childs
router.get('/getListParent', async (req, res) => {
  const data = await M_Category.aggregate([
    {$match: {parentsID: null}},
    {
      $project: { // same select
        _id: 1,
        name: 1,
        slug: 1,
        status: 1,
        parentsID: 1
      }
    },
    {
      $lookup: {
        from: 'categories',
        localField: '_id',
        foreignField: 'parentsID',
        pipeline: [
          {
            $project: { // same select
              _id: 1,
              name: 1,
              slug: 1,
              status: 1,
              parentsID: 1
            }
          }
        ],
        as: 'childs'
      }
    }
  ]).exec()

  res.send({
    message: 'Success', 
    code: 200, 
    data
  })
})


//getParentPoduct theo tung ID ( lay danh sach cac san pham thuoc Category
router.get('/getParentProduct/:id', async (req, res) => {
  var _id = req.params.id

  if(ObjectId.isValid(_id) == false){
    res.send({
      message: 'Success',
      code: 403,
      error: 'Dữ liệu không '
    })
    return
  }
  // check DB
  const checkId = await M_Category.find({_id}).exec();
  if(checkId.length == 0){
    res.send({
      message: 'Success',
      code: 403,
      error: 'Dữ liệu không đúng'
    })
    return
  }

  const data = await M_Category.find(
    {parentsID: mongoose.Types.ObjectId(_id)}
  )
  .select(['_id','name','avatar'])
  .exec();

  res.send({
    message: 'Success',
    code: 200,
    data
  })

})

// getDetail
router.get('/getDetail/:id', async (req, res) => {
  if(ObjectId.isValid(req.params.id) == false){
    res.send({
      message: 'Success',
      code: 403,
      error: 'Dữ liệu không tồn tại'
    })
    return
  }

  if(req.params.id == undefined){
    res.send({
      message: 'Success',
      code: 403,
      error: 'Dữ liệu không tồn tại'
    })
    return
  }

  const data = await M_Category
    .find({_id: mongoose.Types.ObjectId(req.params.id)}, {name: 1})
    .exec();

  res.send({
    message: 'Success',
    code: 200,
    data
  })

    results = {msg: 200, data};
})

// create
router.post('/create', async (req, res) => {

  const object = {}
  const name = req.body.name;

  if(name == undefined || name.trim() == '' ){
    res.send({
      message: 'Success',
      code: 403,
      error: 'Tên không được rỗng'
    })
    return
  }

  const slug = use_C_Admin.ChangeToSlug(name)
  const parentsID = req.body.parentsID == undefined || req.body.parentsID.trim() == '' ? null : req.body.parentsID;

  if(parentsID != null){
    if(ObjectId.isValid(parentsID) == false){
      res.send({
        message: 'Success',
        code: 403,
        error: 'ParentsID không được hợp lệ'
      })
      return
    }
  }

  // object.parentsID = parentsID
  const avatar = req.body.avatar;
  if(avatar != undefined) object.avatar = avatar


  const data = await M_Category.create({name, slug, parentsID, avatar})

  res.send({
    message: 'Success',
    code: 200,
    data
  })
})


// update cho Category

router.put('/update/:id', async (req, res) => {


  if(ObjectId.isValid(req.params.id) == false){
    res.send({
      message: 'Success',
      code: 403,
      error: 'Dữ liệu không tồn tại'
    })
    return
  }


  const checkID = await M_Category.find(
    {_id: mongoose.Types.ObjectId(req.params.id)})
    .exec()

  if(checkID == ''){
    res.send({
      message: 'Success',
      code: 403,
      error: 'Dữ liệu không tồn tại'
    })
    return
  }

  const objectUpdate = {}

  const name = req.body.name;
  let slug = '';

  if(name != undefined){
    if(name.trim() == '' ){
      res.send({
        message: 'Success',
        code: 403,
        error: 'Tên không được rỗng'
      })
      return
    }else{
      objectUpdate['name'] = name
      objectUpdate['slug'] = use_C_Admin.ChangeToSlug(name)
    }
  }
  
  const parentsID = req.body.parentsID;

  if(parentsID != undefined){
    if(ObjectId.isValid(parentsID) == false){
      res.send({
        message: 'Success',
        code: 403,
        error: 'ParentsID không được hợp lệ'
      })
      return
    }else{
      objectUpdate['parentsID'] = parentsID
    }
  } 
  
  const avatar = req.body.avatar;
  if (avatar != undefined) objectUpdate.avatar =avatar; 


  
  await M_Category.findByIdAndUpdate({
    _id: mongoose.Types.ObjectId(req.params.id)
  },objectUpdate)

  const data = await M_Category.find({_id: mongoose.Types.ObjectId(req.params.id)})
  res.send({
    message: 'Success',
    code: 200,
    data: {
      result: 'Đã Cập nhật',
      field: data
    }
  })

})

// delete
router.delete('/delete/:id', async (req, res) => {
  if(ObjectId.isValid(req.params.id) == false){
    res.send({
      message: 'Success',
      code: 403,
      error: 'Dữ liệu không tồn tại'
    })
    return
  }

  const checkID = await M_Category.find(
    {_id: mongoose.Types.ObjectId(req.params.id)}).exec()

  if(checkID == ''){
    res.send({
      message: 'Success',
      code: 403,
      error: 'Dữ liệu không tồn tại'
    })
    return
  }

  const data = await M_Category.findByIdAndDelete({_id: mongoose.Types.ObjectId(req.params.id)}).exec()

  res.send({
    message: 'Success',
    code: 200,
    data: {
      result: 'Đã xóa',
      field: data
    }
  })
})

router.get('/breadcrumb/:id', async (req, res) => {
  if(ObjectId.isValid(req.params.id) == false){
    res.send({
      message: 'Success',
      code: 403,
      error: 'Dữ liệu không tồn tại'
    })
    return
  }

  const checkID = await M_Category.find(
    {_id: mongoose.Types.ObjectId(req.params.id)}).exec()

  if(checkID == ''){
    res.send({
      message: 'Success',
      code: 403,
      error: 'Dữ liệu không tồn tại'
    })
    return
  }

  // lấy dữ liệu của id
  const data = await M_Category.find(
    {_id: mongoose.Types.ObjectId(req.params.id)}
  ).exec();

  const newData={}

  newData['_id'] = data[0]._id,
  newData['name'] = data[0].name

  if(data[0].parentsID != null){
    const dataFatherOne = await M_Category.find(
      {_id: mongoose.Types.ObjectId(data[0].parentsID)}
    ).exec();
    newData['fatherOne'] = {
      _id: dataFatherOne[0]._id,
      name: dataFatherOne[0].name
    }
  }

  res.send({
    message: 'Success',
    code: 200,
    data: newData
  })
})

router.get('/getListProduct/:id', async (req, res) => {
  var _id = req.params.id;

  if(ObjectId.isValid(_id) == false){
    res.send({
      message: 'Success',
      code: 403,
      error: 'Dữ liệu không đúng'
    })
    return
  }

  // check DB
  const checkId = await M_Category.find({_id}).exec();
  if(checkId.length == 0){
    res.send({
      message: 'Success',
      code: 403,
      error: 'Dữ liệu không đúng'
    })
    return
  }

  const data = await M_Product.find(
    {parentsID: mongoose.Types.ObjectId(_id)}
  )
  .select(['_id','name','price','avatar'])
  .exec();

  res.send({
    message: 'Success',
    code: 200,
    data
  })
})

module.exports = router