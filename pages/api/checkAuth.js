import jwt from "jsonwebtoken";

export default (req, res) => {
  if (req.headers.cookie && req.headers.cookie.includes("token")) {
    // console.log(req.headers.cookie);

    jwt.verify(req.cookies.token, process.env.SECRET, function (err, decoded) {
      // err
      if (err) res.status(401).json({ error: err });
      if (decoded) res.status(200).json(decoded);
      // decoded undefined
    });
  } else {
    res.status(401).json({ status: 401, message: "cookie is missing" });
  }
  res.end();
};
