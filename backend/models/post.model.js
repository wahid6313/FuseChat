import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  caption: { type: String, required: "" },
  image: { type: String, required: true },
  author: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

export default mongoose.model("Post", postSchema);
