const mongoose = require('mongoose');
const schema = mongoose.Schema;
const planSchema = new schema({
    name: {
        type: String
    },
    shortDescription: {
        type: String
    },
    longDescription: {
        type: String
    },
    price: {
        type: String
    },
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
const PlanModel = mongoose.model('Plan', planSchema);
module.exports = PlanModel; 
