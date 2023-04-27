import bcryptjs from "bcryptjs";
import { Schema, model } from "mongoose";

const userSchema = Schema(
  {
    name: { type: "String", required: true },
    email: { type: "String", unique: true, required: true, unique: true },
    password: { type: "String", required: true },
    image: {
      type: "String",
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestaps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});

const User = model("User", userSchema);

export default User;
