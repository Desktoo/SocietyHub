import { model, models, Schema } from "mongoose";

const userSchema = new Schema({
  userName: {
    type: String,
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Username already exists"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

const User = models.User || model("User", userSchema);

export default User;
