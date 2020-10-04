const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");
const { User } = require("./model");
const app = express();
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/register", async (req, res) => {
  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
  });
  res.send(user);
});

app.post("/login", async (req, res) => {
  const user = await User.findOne({
    username: req.body.username,
    // password: req.body.password,
  });
  if (!user) {
    return res.status(422).send("用户名不存在");
  }
  if (req.body.password != user.password) {
    return res.status(422).send("密码错误");
  }
  res.send("登录成功" + user);
});

app.listen(3001, () => {
  console.log("http://localhost:3001");
});
