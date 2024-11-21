const express = require('express');
const { createUser, login, editPersonalInfo, deleteUser, changePwd, forgetPwd, toggleMealFavs } = require('../../controllers/user.controller');
const router = express.Router();

/**
 * POST
 * desc create new user
 */

router.post('/', (req, res) => {
    createUser(req,res);
});

/**
 * POST
 * desc edit user personal info
 */

 router.post('/edit', (req, res) => {
    editPersonalInfo(req,res);
});


/**
 * POST
 * desc change password
 */

 router.post('/change/pwd', (req, res) => {
    changePwd(req,res);
});



/**
 * POST
 * desc delete user
 */

 router.post('/deactivate/account', (req, res) => {
    deleteUser(req,res);
});


/**
 * 
 * POST
 * desc login
 */

 router.post('/login', (req, res) => {
    login(req,res);
});

/**
 * POST
 * desc forgot password
 */

 router.post('/forgot/password', (req, res) => {
    forgetPwd(req,res);
});

/**
 * POST
 * desc favs meal
 */

 router.post('/favs', (req, res) => {
    toggleMealFavs(req,res);
});
module.exports = router;