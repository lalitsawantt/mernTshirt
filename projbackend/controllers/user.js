const User = require("../models/user");
const Order = require("../models/order");

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                error : "User not found"
            });
        }
        
        req.profile = user;
        // console.log("BACKEND/CONTROLLERS/USER/GETUSERBYID : : REQ.PROFILE = ", req.profile);
        next();
    });
};

exports.getUser = (req, res ) => {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile);
}



// update users
exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        {_id : req.profile._id},
        {$set : req.body},
        {new : true, useFindAndModify : false},
    (err, user) => {
        if(err){
            return res.status(400).json({
                error : "Id not found"
            });
        }
        user.salt = undefined;
        user.encry_password = undefined;
        user.createdAt = undefined;
        user.updatedAt = undefined;
        res.json(user);
    }
    );
}


exports.userPurchaseList = (req, res, next) => {
    Order.find({user : req.profile._id})
    .populate("user","_id name")                    // which object you want to update, and which field you want to bring in
    .exec((err, order) => {
        if(err){
            return res.status(400).json({
                error : "No order found for this user"
            })
        }
        return res.json(order);
    })
}


exports.pushOrderInPurchaseList = (req, res, next) => {
    let purchases = [];
    // console.log("CONTROLLERS/USER/PUSHORDERINPURCHASELIST ::: REQ BODY :",req.body);
    req.body.order.products.forEach(product => {
    // req.body.products.forEach(product => {
        purchases.push({
            _id: product._id,
            name: product.name,
            description : product.description,
            category : product.category, 
            quantity : product.quantity,
            amount : req.body.order.amount,
            // amount : req.body.amount,
            transaction_id : req.body.order.transaction_id
            // transaction_id : req.body.transaction_id
        });
    });

    // store this in db
    // console.log("HERE1")

    User.findOneAndUpdate({__id: req.profile._id},
        {$push : {purchases : purchases}},
        // first purchases is the one from the User model and second purchases is the local one
        // update the purchases in the db with the local one
        {new: true},
        (err, purchases) => {
            if(err){
                res.status(400).json({
                    error : "Unable to save the purchases"
                })
                
            }

        }
    )
    next();
}