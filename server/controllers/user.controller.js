const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');

async function foundUser(email){
    let exists = await User.findOne({'local.email': email});
    return !!exists;
}



module.exports = {
    register: async (req, res, next) => {
        const { userName, email, password } = req.body;
        if(await foundUser(email)) {
            return res.status(422).send(['This email already exisits']);
        }
        let user = new User({
            method: 'local', 
            'local.userName': userName, 
            'local.email': email, 
            'local.password': password, 
            'local.isAdmin': false, 
            });

        await user.save((err, doc) => {
            if(!err) return res.send(doc);
            else return next(err);
            }
        );      
    },

    userProfile: async (req, res, next) =>{
        await User.findOne({ _id: req._id }, (err, user) => {
                if (!user)
                    return res.status(404).json({ status: false, message: 'User record not found.' });
                else {
                    let method = user.method;
                    let objUser = {
                        userId: user._id,
                        userName: user[method].userName,
                        userEmail: user[method].email,
                        userIsAdmin: user[method].isAdmin,
                    };
                    return res.status(200).json({ status: true, user : _.pick(objUser, ['userId', 'userName','userEmail', 'userIsAdmin']) });
                }
           }
        );
    },

    authenticate: async (req, res, next) => {
        await passport.authenticate('local', (err, user, info) => {
            if(err) return res.status(400).json(err);

            else if (user) return res.status(200).json({"token": user.generateJwt('local') });

            else return res.status(404).json(info);
        })(req, res);
    },

    facebookOauth: async (req, res, next) => {
        let facebookUser = req.user.facebook;
        User.findOne({"facebook.email": facebookUser.email}, (err, user) => {
            if(!err) return res.status(200).json({ "token": user.generateJwt('facebook') });
        });
    },

    googleOauth: async (req, res, next) => {
        let googleUser = req.user.google;
        User.findOne({'google.email': googleUser.email}, (err, user) => {
            if(!err) return res.status(200).json({ "token": user.generateJwt('google') });
        });
    }
};
 

