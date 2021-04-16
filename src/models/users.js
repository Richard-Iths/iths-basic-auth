const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      favoritePet: {
        type: String,
      },
    },
  },
  {
    toObject: {
      transform: (doc, ret) => {
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

const userModel = mongoose.model("Users", schema);

module.exports = userModel;
