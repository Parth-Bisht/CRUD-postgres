const express = require("express");
const studentRoutes = require("./student/routes");

const app = express();
const port = 4000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("OK");
});

app.use("/api/v1/students", studentRoutes);

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
