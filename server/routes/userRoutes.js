const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  register,
  login,
  checkUser,
  getAllUsersWithQuestions,
  getAllUsers,
} = require("../controller/userController");

// register route
router.post("/register", register);

// Login route
router.post("/login",login);

// check route
router.get("/check", auth, checkUser); 
//  No of Question 
router.get("/numberQuestion", auth, getAllUsersWithQuestions);

module.exports = router;
