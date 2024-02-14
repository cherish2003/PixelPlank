import mongoose from "mongoose";
// import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
});
// UserSchema.pre("save", async function (next) {
//   try {
//     if (this.isModified("password")) {
//       const encrtypass = await bcrypt.hash(this.password, 5);
//       this.password = encrtypass;
//       next();
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

export const user = mongoose.model("user", UserSchema);
