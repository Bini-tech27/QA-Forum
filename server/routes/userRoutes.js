const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {register, login, checkUser} = require("../controller/userController")

// register route
router.post("/register", register);

// Login route
router.post("/login",login);

// check route
router.get("/check", auth, checkUser);

module.exports = router;
