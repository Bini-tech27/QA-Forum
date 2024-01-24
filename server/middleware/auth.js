const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const auth = async (req, res, next) => {
  const token = req.headers.authorization;
//   const splited = token.split(" ");
//   console.log(splited[1], "dfghjkfghj");

  if (!token) {
    return res.status(401).json({ msg: "unauthorized user" });
  }

  try {
    const decoded = jwt.verify(token, "secret-key");
    console.log(decoded, "dec");
    const user = await prisma.user.findUnique({
      where: {
        userId: decoded.id,
      },
    });

    if (!user) {
      return res.status(401).json({ msg: "Unauthorized - Invalid user" });
    }

    req.user = { user };
    next();
  } catch (error) {
    console.error(error.message);
    return res.status(401).json({ msg: "Unauthorized - Invalid users" });
  }
};

module.exports = auth;
