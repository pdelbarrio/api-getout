const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const { validationPassword, setError } = require("../helpers/utils");

const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/getoutbcn/image/upload/v1619196200/users/avatar_lkjiqe.png",
    },
    isAdmin: { type: Boolean, default: false },
    spots: [{ type: Schema.Types.ObjectId, ref: "Spot" }],
    favSpots: [{ type: Schema.Types.ObjectId, ref: "Spot" }],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  if (!validationPassword(this.password)) {
    return next(setError(400, "Invalid password"));
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

module.exports = mongoose.model("User", userSchema);
