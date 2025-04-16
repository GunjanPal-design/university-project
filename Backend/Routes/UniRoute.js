const express = require("express");
const uniControl = require('../Controller/UniControl');
const Middleware = require("../Middleware");

const router = express.Router();

router.post("/Signup", uniControl.Signup);  // Signup route
router.post("/Login", uniControl.Login);// Login route
// router.post("/Register",uniControl.Register)

router.get("/Dashboard", Middleware, uniControl.Dashboard);  


router.get("/user", Middleware, uniControl.UserById);
router.put('/update',Middleware, uniControl.UpdateUser)

module.exports = router;
