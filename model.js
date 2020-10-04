const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/wechat", {
  useCreateIndex: true,
  useNewUrlParser: true,
});

const User = mongoose.model(
  "user",
  new mongoose.Schema({
    username: { type: String, unique: true },
    password: { type: String },
  })
);

module.exports = { User };
