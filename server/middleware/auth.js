const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const auth = async (req, res, next) => {
  const token = req.headers.authorization;
  const splitted = token.split(" ")[1];

  if (!splitted) {
    return res.status(401).json({ msg: "unauthorized user" });
  }

  try {
    const decoded = jwt.verify(splitted, "secret-key");
    const user = await prisma.user.findUnique({
      where: {
        userId: decoded.userId,
      },
    });
    if (!user) {
      return res.status(401).json({ msg: "Unauthorized Invalid users" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error.message);
    return res.status(401).json({ msg: "Authentication-Invalid" });
  }
};

module.exports = auth;
