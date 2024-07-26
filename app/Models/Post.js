import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
  userId : {type:String},
  title: { type: String },
  images: [{ type: String }],
  showPublic: { type: Boolean, default: false }
});

// If you don't need the nesting, you can use DataSchema directly for the Post model
const Post = mongoose.models.Post || mongoose.model("Post", DataSchema);

export default Post;
