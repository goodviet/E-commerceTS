const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;

const secret = '#$DSSDS'

// Gọi Models
const M_User = require('../models/M_User')

// getList
router.get('/getList', (req, res) => {
  res.send('GET request to the homepage')
})

router.get('/getDetail/:token', async (req, res) => {
  if (req.params.token.trim() == '') {
    res.send({
      message: 'Success',
      code: 200,
      data: { error: 'Dữ liệu không chính xác.', code: 403 }
    })
    return
  }

  jwt.verify(req.params.token, secret, async (err, decoded) => {
    if (err) {
      res.send({
        message: 'Success',
        code: 200,
        data: { error: 'Token hết hạn', code: 403 }
      })
      return
    }
    const data = await M_User.find({ _id: decoded.data._id }).exec();

    res.send({
      message: 'Success',
      code: 200,
      data: {
        email: data[0].email,
        // password: data[0].password


      }
    })
  });
})

function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true
  }
  return false
}

function CheckEmpty(value) {
  if (value.trim() == '') {
    return false
  }
  return true
}

// login
router.post('/login', async (req, res) => {
  const email = req.body.email
  const password = req.body.password

  const checkEmptyEmail = CheckEmpty(email)
  const checkEmptyPassword = CheckEmpty(password)
  const validateEmail = ValidateEmail(email)

  const arrayCheck = []

  if (checkEmptyEmail == false) arrayCheck.push('Email không được rỗng.')
  if (validateEmail == false) arrayCheck.push('Email không đúng định dạng.')
  if (checkEmptyPassword == false) arrayCheck.push('Password không được rỗng.')

  if (arrayCheck.length == 0) {
    const checkEmailInDB = await M_User.find({ email })
      .select()
      .limit(1)
      .exec();
    if (checkEmailInDB.length == 0) {
      res.send({
        message: 'Success',
        code: 200,
        data: { error: 'Dữ liệu không chính xác.', code: 403 }
      })
      return
    }
    // bcryptjs
    const checkPassword = bcrypt.compareSync(password, checkEmailInDB[0].password);
    if (!checkPassword) {
      res.send({
        message: 'Success',
        code: 200,
        data: { error: 'Dữ liệu không chính xác.', code: 403 }
      })
      return
    }
    // token
    const token = jwt.sign({
      data: { _id: checkEmailInDB[0]._id }
    }, secret, { expiresIn: 60 * 60 });

    res.send({
      message: 'Success',
      code: 200,
      data: { token }
    })
  }
  else res.send({
    message: 'Success',
    code: 200,
    data: { error: arrayCheck, code: 403 }
  })
})



const salt = bcrypt.genSaltSync(10);
// register

router.post('/register', async (req, res) => {
  const fullname = req.body.fullname;
  const email = req.body.email;
  const password = req.body.password
  const address = req.body.address
  const phone = req.body.phone

  // kiem tra du lieu
   
  //checkPassword 


  // checkEmail 

  const checkEmailR = await M_User.find({ email }).limit(1).select('_id').exec();
  if (checkEmailR.length > 0) {
    res.send({
      message: 'Success',
      code: 200,
      data: { error: 'Du lieu da ton tai', code: 603 }
    })
    return;

    
  }
  


  //checkPhone

  const checkPhone = await M_User.find({ phone }).limit(1).select('_id').exec();
  if (checkPhone.length > 0) {
    res.send({
      message: 'Success',
      code: 200,
      data: { error: 'Du lieu da ton tai', code: 603 }
    })
    return;
  }


  // tao nguoi dung
  const data = await M_User.create({
    name: fullname,
    email,
    password: bcrypt.hashSync(password, salt),
    phone,
    address
  })
  res.send({
    message: 'Success',
    code: 200,
    data
  })


  res.send({ fullname, email, password, phone, address })
})
module.exports = router