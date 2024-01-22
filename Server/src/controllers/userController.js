import { user } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const generateTokens = (data) => {
  const userId = data._id;
  try {
    const accesstoken = jwt.sign(
      {
        data,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );
    const refreshToken = jwt.sign(
      {
        userId,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
    );
    return { accesstoken, refreshToken };
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    return res
      .status(422)
      .json({ success: false, message: "All fields are required" });
  }
  try {
    const existingUser = await user.findOne({ email });
    console.log(email, password);
    if (existingUser === null) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const encrypass = existingUser.password;
    const passRes = await bcrypt.compare(password, encrypass);
    if (!passRes) {
      return res.status(422).json({
        success: false,
        message: "Invalid password",
      });
    }

    // const options = {
    //   httpOnly: true,
    //   secure: true,
    // };
    existingUser.password = undefined;
    const { accesstoken, refreshToken } = generateTokens(existingUser);
    return res
      .status(200)
      .cookie("accesstoken", accesstoken)
      .cookie("refreshtoken", refreshToken)
      .json({
        message: "Login successfull",
        user: existingUser,
      });
  } catch (error) {
    console.log(error);
  }
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  console.log(username, email, password);

  if (req.file) {
    const avatarLocalPath = req.file.path;
    console.log("Avatar local path:", avatarLocalPath);
  }
  // if (!(username && email && password && avatar)) {
  //   res.status(422).json({ sucess: false, message: "All fields are required" });
  // }
  // try {
  //   const existedUser = await user.find({
  //     $or: [{ username, email }],
  //   });
  //   if (existedUser.length) {
  //     return res.status(409).json({
  //       message: "user with username or email already exists",
  //     });
  //   }
  //   const usr = await user.create({
  //     username,
  //     email,
  //     password,
  //     avatar,
  //   });
  //   res.status(200).json({
  //     success: true,

  //     message: "Registration sucessfully",
  //   });
  // } catch (error) {
  //   console.log(error);
  //   return res.status(500).json({
  //     success: false,
  //     message: "Internal Server Error",
  //   });
  // }
};

const getUserData = async (req, res) => {
  const Userid = req.user;
  console.log(Userid);
  // try {
  //   const UserData = await user.findById(Userid);
  //   console.log(UserData);
  // } catch (error) {
  //   console.log(error);
  //   return res.status(404).json({
  //     message: "User not found",
  //   });
  // }
};

const getRefreshToken = async (req, res) => {
  const refreshtoken = req.cookies.refreshtoken;
  console.log(refreshtoken);
  let userFromToken;
  const verRefresh = jwt.verify(
    refreshtoken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, user) => {
      if (err) {
        console.log(err);
        return res
          .status(422)
          .clearCookie("accesstoken")
          .clearCookie("refreshtoken")
          .json({
            message: "Refresh token expired",
            logout: true,
          });
      }
      userFromToken = user;
    }
  );
  if (userFromToken) {
    const { userId } = userFromToken;
    const existedUser = await user.findById(userId);
    if (existedUser == null) {
      return res.status(404).json({
        message: "User not found",
        logout: true,
      });
    }
    const { accesstoken } = generateTokens(userFromToken);
    res.status(200).cookie("accesstoken", accesstoken).json({
      message: "Refreshed token",
      logout: false,
    });
  }
};
export { registerUser, loginUser, getUserData, getRefreshToken };
