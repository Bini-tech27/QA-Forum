const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
const dotenv = require("dotenv")

const prisma = new PrismaClient();
const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/userRoutes");
app.use("/user", userRoutes);

const questionRoutes = require("./routes/questionRoutes");
app.use("/", questionRoutes);

const answerRoutes = require("./routes/answerRoutes");
app.use("/", answerRoutes);

const PORT = process.env.PORT || 5432;

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
