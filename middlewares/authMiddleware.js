import JWT from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    next(new Error("Unauthorized"));
  }
  const token = authHeader.split(" ")[1];
  try {
    const payLoad = JWT.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payLoad.userId };
    next();
  } catch (error) {
    next(new Error("Unauthorized,authantication failed!"));
  }
};

export { userAuth };
