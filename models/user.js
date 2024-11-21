const mongoose = require('mongoose');
const generator = require('generate-password');
const bcrypt = require('bcryptjs');
const schema = mongoose.Schema;
const userSchema = new schema({
    
    email: {
        type: String
    },
    pwd: {
        type: String
    },
    name: {
        type: String
    },
    surname: {
        type: String
    },
    dob: {
        type:Date
    },
    direction: {
        type:String
    },
    population: {
        type:String
    },
    country: {
        type:String
    },
    plan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plan'
    },
    picUrl: {
        type: String
    },
    mobile: {
        type: String
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    favsMeal: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food'
    }],
    role: {
        type: String,
        default: 'Admin',
        enum: ['Admin','External','User']
    },
    paymentClear: { type: Boolean, default: false },
    status: { type: String, default: 'Inactive', enum:['Inactive','Active'] },
    isDeleted: { type: Boolean, default: false },
    isLoggedIn: { type: Boolean },
    modified_at: {
        type: Date,
        default: Date.now
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});
const userModel = mongoose.model('User', userSchema);
module.exports = userModel; 

// convert plan pwd into hash pwd
module.exports.hashPwd = (pwd) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(pwd, salt);
    return hash;
}

// check password

module.exports.checkPwd = async (hash,pwd) => {
    return await bcrypt.compare(pwd, hash);
}

// find user by email
module.exports.findByEmail = async (email) => {
    return await userModel.count({email: email, isDeleted: false});
}

// generate random password
module.exports.generateRndPwd = () => {
    const password = generator.generate({
        length: 10,
        numbers: true
    });
    return password;
}

// update user
module.exports.updateUser = async (id, user) => {
    const data = await userModel.findByIdAndUpdate({ _id: id }, user, { new : true }).select('_id role email name');
    return data;
}
// delete user
module.exports.delUser = async (id) => {
    const data = await userModel.findByIdAndUpdate({ _id: id }, { isDeleted: true }, { new : true }).select('_id');
    return data;
}
