const express = require("express");
const router = express.Router();
const {register, login, checkUser} = require("../controller/userController")

// register route
router.post("/register", register);

// Login route
router.post("/login",login);

// check route
router.get("/check", checkUser);

module.exports = router;
