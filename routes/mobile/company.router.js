const express = require('express');
const { createCompany, getAllCompany } = require('../../controllers/company.controller');
const router = express.Router();

/**
 * GET
 * desc get all companies
 */

router.get('/', (req, res) => {
    getAllCompany(req,res);
});

/**
 * POST
 * desc create new company
 */

router.post('/', (req, res) => {
    createCompany(req,res);
});

module.exports = router;