const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/wechat", {
  useCreateIndex: true,
  useNewUrlParser: true,
});
var db = mongoose.connection;

const User = mongoose.model(
  "user",
  new mongoose.Schema({
    username: { type: String, unique: true },
    password: { type: String },
    moments: { type: Array },
    img: { type: Array },
    photo: { type: String },
  })
);

module.exports = { User };
