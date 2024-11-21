const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const { onSuccess, onFailure, onServerException } = require('../common_funcs/responses');
const { sendMail, sendMailWhenPwdUpdates, sendMailWhenPwdForgot } = require('./mail.controller');

// create new user
module.exports.createUser = async (req, res) => {
    const { name,surName,dob,direction,population,country, email, companyId, role, status ,mobile } = req.body;
    const pwd = userModel.generateRndPwd();
    /**
     * here pwd should be generated randomly and send it to user via email.
    */ 
    try {

        // check user already exists or not

        const isFound = await userModel.findByEmail(email);

        if(isFound > 0) {
            return onFailure(res,'User already exists');
        }
        
        const user = new userModel({
            name,
            surname: surName,
            dob,
            direction,
            population,
            country,
            email,
            companyId,
            mobile,
            role,
            status,
            isLoggedIn: false,
            pwd: userModel.hashPwd(pwd),
            
        });

        const data  = await user.save();
        if (data) {
            let mail = {
                email: data.email,
                name: name,
                subject: 'Account Creation - JF PRO',
                pwd: pwd,
                sender: 'JF PRO TEAM'
            }
            sendMail(mail);
            return onSuccess(res,'User created', {
                _id: data._id,
                role: data.role,
                email: data.email,
                pwd: pwd
            });
        } else {
            return onFailure(res,'User not created');
        }
    } catch (error) {
       return onServerException(res,error);
    }
}

// edit personal info

module.exports.editPersonalInfo = async (req,res) => {
    try {
        const {id, name, email} = req.body;
        
        if(!id || !name || !email) {
            return onFailure(res, 'Empty Fields');
        } 

        if(email) {
            const isExists = await userModel.findOne({email : email, isDeleted: false, _id: {$ne: id}}).select('_id');
            if(isExists) {
                return onFailure(res, 'Email Already exists');
            }
        }
        let profile = {
            name: '',
            surname: '',
            direction: '',
            population: '',
            country: '',
            email: '',
            mobile: '',
        };
        const obj = req.body;
        Object.keys(obj).forEach(key => {
            if(key != 'id') {
                profile[key] = req.body[key];
            }
        })
        
        const data = await userModel.updateUser(id, profile);

        if (data) {
            return onSuccess(res, 'Personal Info Updated', {
                _id: data._id,
                role: data.role,
                email: data.email
            });
        } else {
            return onFailure(res, 'Personal Info Not Updated');
        }

    } catch (error) {
        return onServerException(res, error);
    }
}

// change password

module.exports.changePwd = async (req,res) => {
    try {
        const { pwd, newPwd, id } = req.body;
        
        if(!newPwd || !pwd ) {
            return onFailure(res, 'Empty Fields');
        } 

        const data = await userModel.updateUser(id, {
            pwd: userModel.hashPwd(newPwd)
        });

        if (data) {
            let mail = {
                email: data.email,
                name: data.name,
                subject: 'Change Password - JF PRO',
                sender: 'JF PRO TEAM'
            }
            sendMailWhenPwdUpdates(mail);
            return onSuccess(res, 'Password Updated', data);
        } else {
            return onFailure(res, 'Password Not Updated');
        }

    } catch (error) {
        return onServerException(res, error);
    }
}

// delete user

module.exports.deleteUser = async (req,res) => {
    try {
        const {id} = req.body;

        if(!id) {
            return onFailure(res,'Empty field');
        } 

        const data = await userModel.delUser(id);

        if(data) {
            return onSuccess(res, 'User deleted', data);
        } else {
            return onFailure(res, 'User not deleted');
        }
    
    } catch (error) {
        return onServerException(res,error);
    }
}

// login
module.exports.login = async (req,res) => {
    const { email, pwd } = req.body;

    try {

        // check email exists or not

        const user = await userModel.findOne({ email: email, isDeleted: false }).select('pwd role status companyId');
        
        if (user) {
            // check password
            if (await userModel.checkPwd(user.pwd, pwd)) {

                // check role of user

                if (user.status === 'Active') {

                // create jwt token & send res to front-end 

                const token = jwt.sign({
                    role: user.role,
                    email: email,
                    _id: user._id,
                    companyId: user.companyId
                }, process.env.JWT_KEY || 'secret');


                // update user model

                await userModel.findByIdAndUpdate({ _id: user._id }, { isLoggedIn: true });

                return onSuccess(res,'Logged in successfully', token);

                } else {
                    return onFailure(res,'User status is inactive');
                }

           
            } else {
                return onFailure(res,'Wrong password');
            }
        } else {
            return onFailure(res,'Wrong email address');
        }

    } catch (error) {
       return onServerException(res,error);
    }
};

// forget password
module.exports.forgetPwd = async (req,res) => {
    try {
        const { email } = req.body;
        
        if(!email) {
            return onFailure(res, 'Empty Fields');
        } 

        const isUserExists = await userModel.findByEmail(email);

        if(isUserExists <= 0) {
            return onFailure(res, 'Email Id does not exists, Please create an new account on JF Pro app.');
        }
        
        const pwd = userModel.generateRndPwd();
        const data = await userModel.findOneAndUpdate({ email: email}, { pwd: userModel.hashPwd(pwd) }, { new : true }).select('_id email pwd name');

        if (data) {

            let mail = {
                email: data.email,
                name: data.name,
                subject: 'Forgot Password - JF PRO',
                sender: 'JF PRO TEAM',
                pwd: pwd
            }

            sendMailWhenPwdForgot(mail);
            
            return onSuccess(res, 'Password Updated', {
                id: data._id,
                name: data.name,
                pwd: pwd
            });
        
        } else {
            return onFailure(res, 'Password Not Updated');
        }

    } catch (error) {
        return onServerException(res, error);
    }
}

// favs/unfav meal

module.exports.toggleMealFavs = async (req,res) => {
    const {op, mealId, userId} = req.body;

    if(!op || !mealId || !userId) {
        return onFailure(res,'Empty Fields');
    }
    try {
        let query;
        if(op == 'favs') {
           query = userModel.findByIdAndUpdate({ _id: userId }, { $addToSet: { favsMeal: mealId } }).select('_id');
        } else if (op == 'unFav') {
           query = userModel.findByIdAndUpdate({ _id: userId }, { $pull: { favsMeal: mealId } }).select('_id');
        }
        query.then(suc => {
            return onSuccess(res, 'Meal Toggle fav/unfav updated', {
                id: suc._id
            });
        }).catch(e => {
            return onFailure(res, 'Toggle fav/unfav failed');
        })
    } catch (error) {
        return onServerException(res, error);
    }
}

