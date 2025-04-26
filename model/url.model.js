import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
    },
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    clicks: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    expiresAt: {
      type: Date,
      default: Date.now,
      expires: "1d",
    },
  },
  { timestamps: true }
);
const Url = mongoose.model("Url", urlSchema);
export default Url;
