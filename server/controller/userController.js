const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const prisma = new PrismaClient();

const register = async (req, res) => {
  const { username, firstname, lastname, email, password } = req.body;
  if (!username || !firstname || !lastname || !email || !password) {
    return res
      .status(400)
      .send({ msg: "Please provide all necessary information" });
  }
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "password must be at least 8 character" });
    }
    if (password.length <= 8) {
      return res
        .status(400)
        .json({ msg: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username: username,
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ msg: "User registered successfully", user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ msg: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .send({ msg: "Please provide all necessary information" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    console.log(user, "user");

    if (!user) {
      return res
        .status(400)
        .json({ msg: "User with this email does not exist" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ msg: "Incorrect password" });
    }
    
    const token = jwt.sign(
      { userId: user.userId, username: user.username },
      "secret-key",
      {
        expiresIn: "1d",
      }
    );
    res.status(200).json({ msg: "Login successful", token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ msg: "Something went wrong, try again later" });
  }
};

const checkUser = (req, res) => {
    res.json({ msg: "This is a protected route", user: req.user });
};

module.exports = { register, login, checkUser };
