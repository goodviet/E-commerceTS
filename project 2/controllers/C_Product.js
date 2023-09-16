const C_Layout = require('./C_Layout')

class Product extends C_Layout{
    tableProduct(){

    }
    mainProduct(array=[], keySearch, totalPage, pageNumber, type, cardHeader){
        return this.main(array, type, cardHeader, keySearch, totalPage, pageNumber);
    }
    formProduct(){

    }
}

module.exports = Product