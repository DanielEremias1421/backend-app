const mongoose = require('mongoose');
const schema = mongoose.Schema;
const CpSchema = new schema({
    name: String,
    status: { type: String, default: 'Inactive', enum:['Inactive','Active'] },
    modified_at: {
        type: Date,
        default: Date.now
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = cpModel = mongoose.model('Company', CpSchema);