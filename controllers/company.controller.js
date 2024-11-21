const cpModel = require('../models/company');

// create new company

module.exports.createCompany = async (req, res) => {

    const { name, status } = req.body;

    try {
        const cp = new cpModel({
            name,status
        });
        const data  = await cp.save();
        if (data) {
            return res.status(201).json({
                success: true,
                msg: 'Company created'
            });
        } else {
            return res.status(200).json({
                success: false,
                msg: 'Company not created'
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'Server Error occured'
        });
    }
}

// get all companies

module.exports.getAllCompany = async (req,res) => {
    const data = await cpModel.find();
    if (data.length > 0 ) {
        return res.status(200).json({ success: true, cps: data });
    }
    return res.status(404).json({ success: false, msg: 'Found' });
}