const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const postAnswers = async (req, res) => {
  const user = req.user;
  const questionId = req.params.questionId;

  if (!req.params.questionId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Missing questionId parameter." });
  }

  try {
    const { answer } = req.body;

    if (!answer) {
      return res.status(400).json({ msg: "Please provide the answer" });
    }
    const newAnswer = await prisma.answer.create({
      data: {
        answer: answer,
        userId: user.userId,
        questionId: parseInt(questionId),
      },
    });

    return res
      .status(201)
      .json({ msg: "Answers posted successfully", answer: newAnswer });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ msg: "something went wrong try again later" });
  }
};
const getAnswers = async (req, res) => {
  const questionId = req.params.questionId;

  if (!questionId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Missing questionId parameter." });
  }

  try {
    const answers = await prisma.answer.findMany({
      where: {
        questionId: parseInt(questionId),
      },
    });

    if (answers.length < 1) {
      return res.status(404).json({ msg: "No answers found" });
    }

    return res.status(200).json({ answers });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ msg: "Something went wrong, please try again" });
  }
};

module.exports = { getAnswers, postAnswers };
