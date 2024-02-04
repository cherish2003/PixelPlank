import mongoose from "mongoose";

const CanvasSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});
export const canvas = mongoose.model("canvas", CanvasSchema);
