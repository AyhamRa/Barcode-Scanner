import jwt from "jsonwebtoken";

const check_auth = (req, res, next) => {
  console.log(req.headers)
  const token = req.headers.token;
  if (token) {
    try {
      console.log('VERIFIED')
      const check = jwt.verify(token, "secret");
      console.log("Check : ", check);
      next();
    } catch (error) {
      console.log('NOT VERIFIED', error)

      res.json({ notAutorized: "Not-authorized" });
    }
  }else{
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
  console.log("this is my token:" + " " + token);

  return token;
};


export  {check_auth, generateToken};
