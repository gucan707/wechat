const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/wechat", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = mongoose.model(
  "user",
  new mongoose.Schema({
    username: { type: String, unique: true },
    password: { type: String },
    moments: { type: Array },
    img: { type: [{ type: Array }] },
    photo: { type: String },
    status: { type: String },
    chat: {
      type: [
        {
          friends: { type: String },
          message: { type: String },
          isReceiver: { type: Boolean },
        },
      ],
    },
  })
);

module.exports = { User };
