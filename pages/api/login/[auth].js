const jwt = require("jsonwebtoken");


export default (req, res) => {
  console.log('cookies', req.cookies);
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ name: "John Doe" }));
};



// module.exports = (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     console.log(token);
//     const decoded = jwt.verify(token, process.env.JWT_KEY);
//     req.userData = decoded;
//   } catch (error) {
//     return res.status(401).json({ message: "Auth failed 1401" });
//   }
//   next();
// };