import jwt from "jsonwebtoken";

const check_auth = (req, res, next) => {
  console.log(req.headers)
  const token = req.headers.token;
  if (token) {
    try {
      // console.log('VERIFIED')
      const decoded = jwt.verify(token, "secret");
      req.isAdmin = decoded.data.role === 'admin';
      req.isModerator = decoded.data.role === 'moderator';
      // console.log("Check : ", req.isAdmin );
      next();
    } catch (error) {
      // console.log('NOT VERIFIED', error)
      res.json({ notAutorized: "Not-authorized" });
    }
  } else {
    res.json({ notAutorized: "Not-authorized" });
  }
};

const generateToken = (data) => {
  const token = jwt.sign(
    {
      data: data
    },
    "secret",
    { expiresIn: "10h" }
  );
  // console.log("this is my token:" + " " + token);
  return token;
};


export { check_auth, generateToken };
