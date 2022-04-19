const mongoose = require("mongoose");
const { CATEGORIES } = require("../constants/categories");
const Schema = mongoose.Schema;

const spotSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    images: {
      type: String,
      default:
        "https://res.cloudinary.com/parkfinder/image/upload/v1650377841/getout/defaultspot_g6za3l.png",
    },
    website: { type: String },
    validated: { type: Boolean, default: false },
    category: { type: String, enum: CATEGORIES, required: true },
    uploader: { type: Schema.Types.ObjectId, ref: "User" },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Spot", spotSchema);
