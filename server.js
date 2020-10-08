const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { User } = require("./model");
const app = express();
const formidable = require("formidable");
const http = require("http").Server(app);
const io = require("socket.io")(http);

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
  });
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
  // console.log(user);
  user.moments[user.moments.length] = req.body.content;
  user.markModified("moments");
  user.save(function (err, user) {
    if (err) return console.log(err);
  });
  res.send(user);
});

app.post("/upload", (req, res) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(__dirname, "public", "upload");
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    const user = await User.findOne({
      username: fields.username,
    });
    let imgPath = "http://localhost:3001/" + files.imgs.path.split("public")[1];

    if (!user.img[user.moments.length]) {
      user.img[user.moments.length] = [];
    }
    user.img[user.moments.length][
      user.img[user.moments.length].length
    ] = imgPath;
    user.markModified("img");
    user.save(function (err, user) {
      if (err) return console.log(err);
    });
    res.send(user);
  });
});

app.post("/photo", (req, res) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(__dirname, "public", "upload");
  form.keepExtensions = true;
  console.log("1");
  form.parse(req, async (err, fields, files) => {
    const user = await User.findOne({
      username: fields.username,
    });
    let photoPath =
      "http://localhost:3001/" + files.myPhoto.path.split("public")[1];
    user.photo = photoPath;
    user.markModified("photo");
    user.save(function (err, user) {
      if (err) return console.log(err);
    });
    // console.log(files);
    res.send(user.photo);
  });
});

app.post("/userSearch", async (req, res) => {
  const user = await User.findOne({
    username: req.body.username,
  });
  res.send(user);
});

app.post("/message", async (req, res) => {
  const user = await User.findOne({
    username: req.body.username,
  });
  let index;
  if (!user.chat) {
    user.chat = [];
    index = 0;
  } else {
    index = user.chat.length;
  }
  user.chat[index] = {};

  user.chat[index].friends = req.body.friend;
  user.markModified("friends");
  user.chat[index].message = req.body.message;
  user.markModified("message");
  user.chat[index].isReceiver = req.body.isReceiver;
  user.markModified("isReceiver");

  user.save(function (err, user) {
    if (err) return console.log(err);
  });
  res.send(user);
});

// var onlineUser = [];
var onlineUsername = [];
var onlineUserId = [];
// toArr(onlineUser);

io.on("connection", function (socket) {
  console.log("a user connected");

  socket.on("online", function (data) {
    let index = onlineUsername.findIndex(
      (value, index) => value == data.username
    );
    if (index == -1) {
      onlineUsername[onlineUsername.length] = data.username;
      onlineUserId[onlineUserId.length] = socket.id;
      // console.log(onlineUsername);
      // console.log(onlineUserId);
    } else {
      onlineUserId[index] = socket.id;
      // console.log(onlineUsername);
      // console.log(onlineUserId);
    }
    for (let i = 0; i < onlineUserId.length; i++) {
      let obj = { onlineUsername: onlineUsername, index: i };
      if (io.sockets.connected[onlineUserId[i]]) {
        // console.log(onlineUsername[i]);
        io.sockets.connected[onlineUserId[i]].emit("onlineUser", obj);
      }
    }
  });

  socket.on("message", function (data) {
    // console.log(data);
    let index = onlineUsername.findIndex(
      (value, index) => value == data.receiver
    );
    io.sockets.connected[onlineUserId[index]].emit("toSomeone", data);
  });

  socket.on("disconnect", function (info) {
    console.log(info);
    console.log("user disconnected");
  });
});

http.listen(3001, () => {
  console.log("http://localhost:3001");
});
