const mongoose = require('mongoose');
const {
    ObjectId
} = mongoose.Schema;

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

module.exports = mongoose.model("ProductCart", ProductCartSchema);