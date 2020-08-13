var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');

const {signout, signup, signin, isSignedIn} = require("../controllers/auth");

router.post(
    "/signup",
    [
        body("name").isLength({min: 3}).withMessage("name should be atleast 3 characters long"),
        body("email").isEmail().withMessage("Invalid email!"),
        body("password").isLength({min : 3}).withMessage("password should be atleast 3 characters long")
    ],
    signup);

router.post(
    "/signin",
    [
        body("email").isEmail().withMessage("Email is required"),
        body("password").isLength({ min: 3 }).withMessage("password field is required")
    ],
    signin);    

router.get("/signout", signout);



module.exports = router;