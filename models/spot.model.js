const mongoose = require("mongoose");
const { CATEGORIES } = require("../constants/categories");
const Schema = mongoose.Schema;

const spotSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    website: { type: String },
    validated: { type: Boolean, default: false },
    category: { type: String, enum: CATEGORIES, required: true },
    location: { type: String, required: true },
    uploader: { type: Schema.Types.ObjectId, ref: "User", required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Spot", spotSchema);

// TODO: Next versión of GetOut will have MapBox and GeoJSON implementation
// location: {
//   type: {
//     type: String,
//     enum: ["Point"],
//   },
//   coordinates: {
//     type: [Number],
//   },
// },
