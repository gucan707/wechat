const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");
const { User } = require("./model");
const app = express();
var session = require("express-session");
var cookieparser = require("cookie-parser");
const formidable = require("formidable");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// 复制了一段session的东西打印出来看看，还不是太懂也没有用它，也没啥影响就先留着了
app.use(
  session({
    secret: "dsafsafsf", //设置签名秘钥  内容可以任意填写
    cookie: { maxAge: 80 * 1000 }, //设置cookie的过期时间，例：80s后session和相应的cookie失效过期
    resave: true, //强制保存，如果session没有被修改也要重新保存
    saveUninitialized: false, //如果原先没有session那么久设置，否则不设置
  })
);

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
  console.log(req.session);
  if (!user) {
    return res.status(422).send("用户名不存在");
  }
  if (req.body.password != user.password) {
    return res.status(422).send("密码错误");
  }
  res.send(user);
});

app.post("/moments", async (req, res) => {
  const user = await User.findOne({
    username: req.body.username,
  });
  console.log(user);
  user.moments[user.moments.length] = req.body.content;
  user.markModified("moments");
  user.save(function (err, user) {
    if (err) return console.log(err);
  });
  res.send(user);
});

app.post("/upload", (req, res) => {
  // const user = await User.findOne({
  //   username: req.body.username,
  // });
  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(__dirname, "public", "upload");
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    const user = await User.findOne({
      username: fields.username,
    });
    console.log(files.imgs.path.split("public")[1]);
    console.log(fields);
    // res.send(user);
    let imgPath = "http://localhost:3001/" + files.imgs.path.split("public")[1];
    user.img[user.moments.length] = imgPath;
    user.markModified("img");
    user.save(function (err, user) {
      if (err) return console.log(err);
    });
    res.send(user);
  });
});

app.listen(3001, () => {
  console.log("http://localhost:3001");
});
