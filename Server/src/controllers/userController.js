import { user } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cloudinary from "../utils/cloudinary.js";

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

    const options = {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    };
    existingUser.password = undefined;
    const { accesstoken, refreshToken } = generateTokens(existingUser);
    return res
      .status(200)
      .cookie("accesstoken", accesstoken, options)
      .cookie("refreshtoken", refreshToken, options)
      .json({
        message: "Login successful",
        user: existingUser,
      });
  } catch (error) {
    console.log(error);
  }
};

const registerUser = async (req, res) => {
  const { username, email, password, avatar } = req.body;

  console.log(username, email, password);

  try {
    const existedUser = await user.findOne({
      $or: [{ username }, { email }],
    });
    if (existedUser != null) {
      if (existedUser.username == username) {
        return res.status(409).json({
          message: "Username already exists",
        });
      } else {
        return res.status(409).json({
          message: "Email already exists",
        });
      }
    } else {
      const uploadedresponse = await cloudinary.uploader.upload(avatar, {
        public_id: `${username}`,
      });
      const usr = await user.create({
        username,
        email,
        password,
        avatar: uploadedresponse.url,
      });
      return res.status(200).json({
        success: true,
        message: "Registration sucessful",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getUserData = async (req, res) => {
  const Userid = req.params.id;
  try {
    const UserData = await user.findById(Userid);
    UserData.password = undefined;
    return res.status(200).json({
      data: UserData,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: "User not found",
    });
  }
};

const getRefreshToken = async (req, res) => {
  const refreshtoken = req.cookies.refreshtoken;
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
        logout: true,
      });
    }
    const { accesstoken } = generateTokens(userFromToken);
    res.status(200).cookie("accesstoken", accesstoken).json({
      logout: false,
    });
  }
};
export { registerUser, loginUser, getUserData, getRefreshToken };
