import jwt from "jsonwebtoken";

const secret = "test";

const auth = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (authorizationHeader) {
      const token = authorizationHeader.split(" ")[1];
      let decodedData;

      if (token) {
        decodedData = jwt.verify(token, secret);

        req.userId = decodedData?.id;
        req.isLoggedIn = true;
      }
    }

    next();
  } catch (error) {
    console.log(error);
    next(error); // You might want to propagate the error to the error handler middleware
  }
};

export default auth;