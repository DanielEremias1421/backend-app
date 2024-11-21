const mongoose = require('mongoose');
const schema = mongoose.Schema;
const couponSchema = new schema({
    coupon: {
        type: String
    },
    plan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plan'
    },
    subscription: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subscription'
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
const couponModel = mongoose.model('Coupon', couponSchema);
module.exports = couponModel; 
