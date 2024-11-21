const mongoose = require('mongoose');


const schema = mongoose.Schema;

const subscriptionSchema = new schema({
    
    name: {
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
const subModel = mongoose.model('Subscription', subscriptionSchema);
module.exports = subModel; 
