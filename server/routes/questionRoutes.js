const express = require("express");
const auth = require("../middleware/auth");

const {
  allQuestions,
  postQuestions,
  singleQuestion,
} = require("../controller/questionController");
const router = express.Router();

//post question route
router.post("/post-questions", auth, postQuestions);

//all questions route
router.get("/all-questions", auth, allQuestions);

//single questions route
router.get("/single-question/:questionId", auth, singleQuestion);
module.exports = router;
