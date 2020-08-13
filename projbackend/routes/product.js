const express = require('express');
const router = express.Router();

// middlewares and methods
const {isAdmin, isAuthenticated, isSignedIn} = require("../controllers/auth");
const {
    getProductById,
    createProduct,
    getProduct,
    photo,
    deleteProduct,
    updateProduct,
    getAllProducts,
    getAllUniqueCategories
} = require("../controllers/product");
const {getUserById} = require("../controllers/user");

//  params
router.param("productId", getProductById);
router.param("userId", getUserById);

// routes
// create route
router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, createProduct);
// router.get("/testProduct/:userId", isSignedIn, isAuthenticated, isAdmin, randomTest);

//  read routes
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

// update routes
router.put("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, updateProduct);

// delete routes
router.delete("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, deleteProduct);

router.get("/products", getAllProducts); 

// listing routes
router.get("/products/categories", getAllUniqueCategories);

module.exports = router;
