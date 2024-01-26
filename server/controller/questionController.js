const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const allQuestions = async (req, res) => {
  try {
    const questions = await prisma.question.findMany();

    if (questions.length < 1) {
      return res.status(404).json({ msg: "No questions found" });
    }

    return res.status(200).json({ questions });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ msg: "Something went wrong, please try again" });
  }
};

const postQuestions = async (req, res) => {
  const user = req.user;
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ msg: "Please provide all necessary information" });
    }
    const newQuestion = await prisma.question.create({
      data: {
        title: title,
        description: description,
        userId: user.userId,
      },
    });

    return res
      .status(201)
      .json({ msg: "Question posted successfully", question: newQuestion });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: error });
  }
};

module.exports = { allQuestions, postQuestions };
