const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/userRoutes");
app.use("/user", userRoutes);

const questionRoutes = require("./routes/questionRoutes");
app.use("/", questionRoutes);

const answerRoutes = require("./routes/answerRoutes");
app.use("/", answerRoutes);

const PORT = "https://questionhub-backend.onrender.com";
app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
