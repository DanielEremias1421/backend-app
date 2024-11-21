
const express = require('express');
const router = express.Router();
const ProductModel = require('../../models/product');
const { onSuccess, onFailure } = require('../../common_funcs/responses');


/**
 * POST
 * desc get product list
 */

router.get('/', (req, res) => {
    const products = ProductModel.getProducts();
    if(products.length > 0 ){
        return onSuccess(res, 'Product found', products);
    } else {
        return onFailure(res, 'No product found');
    }
});

module.exports = router;