const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
      required: true,
    },
    commentDesc: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    username: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
