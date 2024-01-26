const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const allAnswers = async (req, res) => {
  try {
    const answers = await prisma.answer.findMany();

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

const postAnswers = async (req, res) => {
  const user = req.user;
  console.log("object",user)
  try {
    const { answer } = req.body;
    if (!answer) {
      return res.status(400).json({ msg: "Please provide the answer" });
    }
    const newAnswer = await prisma.answer.create({
      data: {
        answer: answer,
        userId: user.userId,
      },
    });

    return res
      .status(201)
      .json({ msg: "Answers posted successfully", answer: newAnswer });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: "error" });
  }
};

module.exports = { allAnswers, postAnswers };
