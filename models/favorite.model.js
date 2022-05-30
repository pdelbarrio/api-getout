const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteSchema = new Schema(
  {
    userFrom: { type: Schema.Types.ObjectId, ref: "User" },
    spotId: { type: String },
    spotName: { type: String },
    spotImage: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Favorite", favoriteSchema);
