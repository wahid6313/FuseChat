import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "User not Authenticated",
        sucess: false,
      });
    }
    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      return res.status(401).json({
        message: "invalid token",
        sucess: false,
      });
    }

    req.id = decode.userId;
    next();
  } catch (error) {
    console.log(error);
  }
};
// const isAuthenticated = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "User not authorized" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.id = decoded.userId; // Attach user ID to request
//     next();
//   } catch (error) {
//     res.status(403).json({ message: "Token is invalid" });
//   }
// };

export default isAuthenticated;
