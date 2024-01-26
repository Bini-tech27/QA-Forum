const express = require("express");
const auth = require("../middleware/auth");
const {
  allAnswers,
  postAnswers,
} = require("../controller/answerController");
const router = express.Router();

//post answer route
router.post("/post-answers", auth, postAnswers);

//all answer route
router.get("/answers",auth, allAnswers);

module.exports = router;
