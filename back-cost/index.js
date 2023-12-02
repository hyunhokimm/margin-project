const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoute = require("./route/userRoute");
const marginRoute = require("./route/marginRoute");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({ origin: "https://marginproject.netlify.app" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

app.use("/user", userRoute);
app.use("/margin", marginRoute);

app.get("*", (req, res) => {
  res.send("hello");
});

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("DB 연결 완료...");
  })
  .catch((err) => {
    console.error(err);
  });

app.listen(PORT, () => {
  console.log(`http:/localhost:${PORT}`);
});
