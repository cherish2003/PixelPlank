import jwt from "jsonwebtoken";

export const Verifyjwt = (req, res, next) => {
  try {
    const accesstoken = req.cookies.accesstoken;
    console.log(accesstoken);

    if (!accesstoken) {
      return res.status(401).json({
        message: "Unauthorized request",
      });
    }

    jwt.verify(accesstoken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        console.log(err);
        return res.clearCookie("accesstoken").status(498).json({
          message: "Token expired",
          expired: true,
        });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    res.status(401).json({
      message: "Invaild Token",
    });
    console.log(error);
  }
};
