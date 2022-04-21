const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/parkfinder/image/upload/v1619196200/users/avatar_lkjiqe.png",
    },
    spots: [{ type: Schema.Types.ObjectId, ref: "Spot" }],
    favSpots: [{ type: Schema.Types.ObjectId, ref: "Spot" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
