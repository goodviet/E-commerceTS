const express = require('express')
const router = express.Router()

// Gọi controllers
const C_Product = require('../controllers/C_Product')
const use_C_Product = new C_Product()

// Gọi Models
const M_Product = require('../models/M_Product')
const M_Category = require('../models/M_Category')

router.get('/index(/:pageNumber)?', 

(req, res, next) => {
    if(req.cookies.name == undefined) res.redirect('/login')
    next()
},

async (req, res) => {
    const use_C_Class = new C_Product(req.originalUrl)

    var keySearch = req.query.key

    var match = {status: false}

    if(keySearch != undefined && keySearch != ''){
        match['name'] = { $regex: '.*' + keySearch + '.*' }
    }

    const limit = 5;
    let skip = 0;

    const pageNumber = req.params.pageNumber;
    let newPageNumber = 1;

    if(pageNumber != undefined && pageNumber != 1){
        skip = (pageNumber - 1) * limit;
        newPageNumber = pageNumber;
    }

    const list = await M_Product.aggregate([
        { $match: match },
        { $limit: (limit + skip) },
        { $skip: skip },
        { $sort: {_id: -1} },
        {
            $lookup:
            {
                from: 'categories',
                localField: 'parentsID',
                foreignField: '_id',
                as: 'Product_vs_Category'
            }
        }
    ]).exec()


    let totalPage = 0;
    // Tìm tổng dữ liệu
    const totalData = await M_Product.find(match);
    totalPage = Math.ceil( totalData.length / limit );

    const fullList = {}
    const newList = []

    list.forEach((e) => {
        newList.push({
            id: e._id,
            name: e.name,
            parents: e.Product_vs_Category[0].name,
            status: e.status
        })
    })

    fullList['data'] = newList
    fullList['sort'] = false;
    fullList['dequy'] = false;

    const main = use_C_Class.mainProduct(fullList, keySearch, totalPage, newPageNumber)

    var path = 'main';
    res.render('admin/index', {
        path, 
        main,
        keySearch,
        nameModule: use_C_Class.getNameModuleURL()
    })
})

// form
router.get('/form(/:id)?', async (req, res) => {
    const use_C_Class = new C_Product(req.originalUrl)
    
    const id = req.params.id;
    let listByID = []
    let valueName = valueParentsID = '';

    if(id == undefined){
        // thêm
    }else{
        // chỉnh sửa
        listByID = await M_Product.find({_id: id})
        valueName = listByID[0].name;
        valueParentsID = listByID[0].parentsID;
    }


    // danh sách danh mục
    const list = await M_Category.find()

    const newList = []

    list.forEach(e=>{ newList.push({ 
        id: e._id.toString(), 
        name: e.name, 
        parentsID: (e.parentsID==null) ? '' : e.parentsID.toString()
    }) })
   
    // form
    const Attribute = [
        {
            element: 'input', type: 'text', 
            name: 'name', id: 'name', class: 'name',
            value: valueName
        },
        {
            element: 'select', type: '', 
            name: 'parentsID', id: 'parentsID', class: 'parentsID',
            array: newList, dequy: true, value: valueParentsID.toString()
        }
    ];

    const main = use_C_Class.mainProduct(Attribute, '', '', '', 'form', 'edit')

    var path = 'main';
    res.render('admin/index', {
        path, 
        main,
        nameModule: use_C_Class.getNameModuleURL()
    })
})

router.post('/insert', async function (req, res) {
    var name = slug = parentsID = ''
    var data = {}
    var flag=1

    name = req.body.name
    slug = use_C_Product.ChangeToSlug(name)
    parentsID = req.body.parentsID

    if(name!=''){
        data['name'] = name
        data['slug'] = slug
    }

    if(parentsID!='') data['parentsID'] = parentsID

    if(flag == 1){

        const nameCheck = await M_Product.find({ $or:[ {name}, {slug} ] }).select('_id')

        if(nameCheck == '')
        {
            data['userID'] = req.cookies.name

            await M_Product
            .create(data, (err)=>{
                if(err){
                    res.send({kq:0, msg: 'Kết nối DB thất bại'})
                }
                else{
                    res.send({kq:1, msg: 'Đã thêm thành công'})
                }
            })
        }
        else
        {
            res.send({kq:0, err: '500', msg: 'Dữ liệu đã tồn tại'})
        }
    }
})

var ObjectId = require('mongoose').Types.ObjectId;

router.post('/delete', async (req, res) => {
    var id = req.body.id;

    var error = '';
    var flag = 1;

    if(id == ''){
        error = 'Vui lòng nhập ID';
        flag = 0;
    }

    if(ObjectId.isValid(id) == false){
        error = 'ID không hợp lệ';
        flag = 0;
    }

    if(flag == 1){
        // check db
        var checkID = await M_Product.find({_id: id})

        if(checkID != ''){
            await M_Product.updateMany({_id: id}, {status: true})
            res.send({data: 'Đã xóa!', msg: 200})
        }else{
            error = 'Dữ liệu không tồn tại!'
            flag = 0
        }
    }
    else{
        res.send({error, msg: 500})
    }
})

module.exports = router