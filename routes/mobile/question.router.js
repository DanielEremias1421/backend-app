
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const questModel = require('../../models/questions');
const { onSuccess, onFailure } = require('../../common_funcs/responses');


/**
 * POST
 * desc get questions list
 */

router.get('/', (req, res) => {
    const questions = questModel.getQuest();
    if(questions.length > 0 ){
        return onSuccess(res, 'Question found', questions);
    } else {
        return onFailure(res, 'No question found');
    }
});

module.exports = router;