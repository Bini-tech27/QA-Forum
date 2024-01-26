const express = require("express");
const auth = require("../middleware/auth");
const { getAnswers, postAnswers } = require("../controller/answerController");
const router = express.Router();

//post answer route
router.post("/post-answers/:questionId", auth,  postAnswers);

//all answer route
router.get("/answers/:questionId", auth, getAnswers);

module.exports = router;
