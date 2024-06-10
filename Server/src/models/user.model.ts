import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  adIds: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.index({ email: 1 });
const User = model("User", userSchema);

export default User;
