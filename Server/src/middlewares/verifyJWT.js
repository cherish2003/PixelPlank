import jwt from "jsonwebtoken";

export const Verifyjwt = (req, res) => {
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
          logout: true,
        });
      }
    });

    return res.status(200).json({
      logout: false,
    });
  } catch (error) {
    res.status(401).json({
      message: "Invaild Token",
      logout: true,
    });
    console.log(error);
  }
};
