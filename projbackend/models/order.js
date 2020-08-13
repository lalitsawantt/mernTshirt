const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;
// const {ProductCart} = require("./productCart");

const ProductCartSchema = new mongoose.Schema({
    product: {
        type: ObjectId,
        ref: "Product"
    },
    price: Number,
    name: String,
    count: Number

}, {
    timestamps: true
});

// const ProductCart = mongoose.model("ProductCart", ProductCart);
const OrderSchema = new mongoose.Schema({
    products : [ProductCartSchema],
    transaction_id : {},
    amount : {type : Number},
    address : String,
    status : {
        type : String,
        default : "Received",
        enum : ["Cancelled", "Delivered", "Shipped", "Processing", "Received"]
        // the value of the status can only be from the ones defined in the enum.
    },
    updated : Date,
    user : {
        type: ObjectId,
        ref : "User"
    }

},{timestamps : true});

module.exports = mongoose.model("Order", OrderSchema);
module.exports = mongoose.model("ProductCart", ProductCartSchema);

// module.exports = Order;