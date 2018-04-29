var jwt = require("jsonwebtoken");

const user_object = { foo: "bar" };

jwt.sign(user_object, process.env.JWT_SECRET, function(err, token) {
  console.log(err);
  console.log(token);
});
