const mongoose = require('mongoose');
const schema = mongoose.Schema;
const trainerSchema = new schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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
const userModel = mongoose.model('Trainer', trainerSchema);
module.exports = userModel; 
