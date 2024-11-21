const mongoose = require('mongoose');
const schema = mongoose.Schema;
const QuestionSchema = new schema({
    title: {
        type: String
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    questions: [],
    isDeleted: { type: Boolean, default: false },
    modified_at: {
        type: Date,
        default: Date.now
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});
const questModel = mongoose.model('Question', QuestionSchema);
module.exports = questModel; 

module.exports.getQuest = () => {
    return [
        {
            id: Date.now().toString(),
            title: 'Health Questionaire',
            questions: [
                {
                    label: 'Do you suffer from any type of chronic disease? Which ?',
                    answer: 'YES',
                    desc: 'The type of chronic disease in the text box'
                },
                {
                    label: 'Do you suffer from any type of chronic disease? Which ?',
                    answer: 'YES',
                    desc: 'The type of chronic disease in the text box'
                },
                {
                    label: 'Do you suffer from any type of chronic disease? Which ?',
                    answer: 'YES',
                    desc: 'The type of chronic disease in the text box'
                },
                
            ],
            addedBy: "60ad2d8db738f554879ae15d"
        },
        {
            id: Date.now().toString(),
            title: 'Food Questionaire',
            questions: [
                {
                    label: 'Do you suffer from any type of chronic disease? Which ?',
                    answer: 'YES',
                    desc: 'The type of chronic disease in the text box'
                },
                {
                    label: 'Do you suffer from any type of chronic disease? Which ?',
                    answer: 'YES',
                    desc: 'The type of chronic disease in the text box'
                },
                {
                    label: 'Do you suffer from any type of chronic disease? Which ?',
                    answer: 'YES',
                    desc: 'The type of chronic disease in the text box'
                },
                
            ],
            addedBy: "60ad2d8db738f554879ae15d"
        },
        {
            id: Date.now().toString(),
            title: 'Physcal Activity Questionaire',
            questions: [
                {
                    label: 'Do you suffer from any type of chronic disease? Which ?',
                    answer: 'YES',
                    desc: 'The type of chronic disease in the text box'
                },
                {
                    label: 'Do you suffer from any type of chronic disease? Which ?',
                    answer: 'YES',
                    desc: 'The type of chronic disease in the text box'
                },
                {
                    label: 'Do you suffer from any type of chronic disease? Which ?',
                    answer: 'YES',
                    desc: 'The type of chronic disease in the text box'
                },
                
            ],
            addedBy: "60ad2d8db738f554879ae15d"
        },
        {
            id: Date.now().toString(),
            title: 'Supplementation Questionaire',
            questions: [
                {
                    label: 'Do you suffer from any type of chronic disease? Which ?',
                    answer: 'YES',
                    desc: 'The type of chronic disease in the text box'
                },
                {
                    label: 'Do you suffer from any type of chronic disease? Which ?',
                    answer: 'YES',
                    desc: 'The type of chronic disease in the text box'
                },
                {
                    label: 'Do you suffer from any type of chronic disease? Which ?',
                    answer: 'YES',
                    desc: 'The type of chronic disease in the text box'
                },
                
            ],
            addedBy: "60ad2d8db738f554879ae15d"
        },
        {
            id: Date.now().toString(),
            title: 'Habits Questionaire',
            questions: [
                {
                    label: 'Do you suffer from any type of chronic disease? Which ?',
                    answer: 'YES',
                    desc: 'The type of chronic disease in the text box'
                },
                {
                    label: 'Do you suffer from any type of chronic disease? Which ?',
                    answer: 'YES',
                    desc: 'The type of chronic disease in the text box'
                },
                {
                    label: 'Do you suffer from any type of chronic disease? Which ?',
                    answer: 'YES',
                    desc: 'The type of chronic disease in the text box'
                },
                
            ],
            addedBy: "60ad2d8db738f554879ae15d"
        },
    ];
}