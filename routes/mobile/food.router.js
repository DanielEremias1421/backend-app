
const express = require('express');
const router = express.Router();
const FoodModel = require('../../models/food');
const { onSuccess, onFailure } = require('../../common_funcs/responses');

/**
 * POST
 * desc get foods list
 */

router.get('/', (req, res) => {
    const Food = FoodModel.getFood();
    if(Food.length > 0 ){
        return onSuccess(res, 'Food found', Food);
    } else {
        return onFailure(res, 'No food found');
    }
});

module.exports = router;