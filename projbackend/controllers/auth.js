const User = require("../models/user");
const { body, validationResult, cookie } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

exports.signup = (req, res) => {  
    
    const error = validationResult(req);
// changed the spelling of errors to error
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()[0].msg
        });
    }



    const user = new User(req.body);
    user.save((err, user) => {
        if(err){
            return res.status(400).json({
                error : "NOT able to save user to db"
            });
        }
        res.json({
            name : user.name,
            email : user.email,
            id : user._id
        });
    });
};


exports.signin = (req, res) => {
    // getting the email and password
    const {email, password} = req.body;
    const errors = validationResult(req);
    
    // error check
    if (!errors.isEmpty()) {
        return res.status(422).json({
        error: errors.array()[0].msg
        });
    }

    // error check for username
    User.findOne({email}, (err, user) => {
        if(err || !user){
            return res.status(400).json({
                error : "User email does not exist"
            });
        }

        else if(!(user.authenticate(password))){
            return res.status(401).json({
                error : "Email and password do not match"
            });
        }

        else{

                const token = jwt.sign({_id : user._id}, process.env.SECRET);

        // put token into cookie
            res.cookie("token", token, {expire : new Date() + 999999});

        // send response to front end
            const {_id, name, email, role} = user;
            return res.json({
                token,
             user:{
                    _id,
                    name,
                    email,
                    role
                }
            });  
        }
        // create token
           
    });
};


exports.isSignedIn = expressJwt({
    secret : process.env.SECRET,
    userProperty: "auth"
});


exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.auth._id == req.profile._id; 
    // console.log("IS AUTHENTICATED BACKEND : : : REQ.PROF :: REQ.AUTH", req.profile, req.auth)  
    if(!checker){
        return res.status(403).json({
            error : "ACCESS DENIED",
            profile : req.profile,
            auth : req.auth
        });
    } 
    // console.log("Is authenticated");      
    next();
}


exports.isAdmin = (req, res, next) => {
    if(req.profile.role === 0){
        return res.status(403).json({
            error : "Admin privileges required. ACCESS DENIED"
        });
    }
    // console.log("Is admin");
    next();
}


exports.signout = (req, res) => {
    res.json({
        message : "User signed out"
    });
};