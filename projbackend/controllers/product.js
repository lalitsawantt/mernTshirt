const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const { body } = require("express-validator");


exports.getProductById = (req, res, next, id) => {      
    Product.findById(id)
    .populate("category")
    .exec((err, product) => {
        if(err || !product){
            return res.status(400).json({
                error : "Product not found"
            });
        }
        req.product = product;
        next();
    });

    // changes this : included next() for undefined product error
};

exports.createProduct = (req, res) => { 
    // 
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "problem with image"
            });
        }
        //destructure the fields
        const {
            name,
            description,
            price,
            category,
            stock
        } = fields;

        if (!name || !description || !price || !category || !stock) {
            return res.status(400).json({
                error: "Please include all fields"
            });
        }

        let product = new Product(fields);

        //handle file here
        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    error: "File size too big!"
                });
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }
        // console.log(product);

        //save to the DB
        product.save((err, product) => {
            if (err) {
                res.status(400).json({
                    error: "Saving tshirt in DB failed"
                });
            }
            res.json(product);
        });
    });
};

exports.getProduct = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
}

exports.photo = (req, res, next) => {
    if(req.product.photo.data){
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
};

exports.deleteProduct = (req, res) => {
    let product = req.product;
    console.log("THIS IS THE REQ: ",req);
    product.remove((err, deletedProduct) => {
        if(err) {
            return res.status(400).json({
                error : `failed to delete ${deletedProduct}`
            })
        }
        res.json({
            message : "Product deleted successfully",
            product : deletedProduct
        });
    })
}

exports.updateProduct = (req, res) => {
     let form = new formidable.IncomingForm();
     form.keepExtensions = true;

     form.parse(req, (err, fields, file) => {
         if (err) {
             return res.status(400).json({
                 error: "problem with image"
             });
         }
         //destructure the fields

         let product = req.product;
         product = _.extend(product, fields);

         //handle file here
         if (file.photo) {
             if (file.photo.size > 3000000) {
                 return res.status(400).json({
                     error: "File size too big!"
                 });
             }
             product.photo.data = fs.readFileSync(file.photo.path);
             product.photo.contentType = file.photo.type;
         }
         // console.log(product);

         //save to the DB
         product.save((err, product) => {
             if (err) {
                 res.status(400).json({
                     error: "Cannot update the product"
                 });
             }
             res.json(product);
         });
     });
}

// product listing
exports.getAllProducts = (req, res) =>{
    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    Product.find()
    .populate("category")
    .sort([[sortBy, "asc"]])
    .select("-photo")
    .limit()
    .exec((err, products) => {
        if(err){
            return res.status(400).json({
                error : "No products found"
            });
        }
        res.json(products);
    });
};


// listing by categories
exports.getAllUniqueCategories = (req, res) => {
    Product.distinct("category", {}, (err, category) => {
        if(err){
            res.status(400).json({
                error : "Cannot get the categories"
            });
        }
        res.json(category);
    })
}


exports.updateStock = (req, res, next) => {
  let myOperations = req.body.order.products.map(prod => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -1, sold: +1 } }
      }
    };
  });

  console.log("##################################")
  console.log("myOperations ::: ", myOperations);
  console.log("DATA RECEIVED:::::::: ", req.body.order);
//   console.log("PROD>COuNT::::::: ", );



  Product.bulkWrite(myOperations, {}, (err, products) => {
    if (err) {
      return res.status(400).json({
        error: "Bulk operation failed"
      });
    }
    next();
  });
};