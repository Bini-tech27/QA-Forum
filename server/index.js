const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");

const prisma = new PrismaClient();
const app = express();
const PORT = 8080;
const host = "0.0.0.0";

app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/userRoutes");
app.use("/user", userRoutes);

const questionRoutes = require("./routes/questionRoutes");
app.use("/", questionRoutes);

const answerRoutes = require("./routes/answerRoutes");
app.use("/", answerRoutes);

app.listen(PORT, host, () => {
  console.log(`Server running at http://${host}:${PORT}`);
});
