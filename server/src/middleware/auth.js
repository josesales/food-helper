const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    //returns the token object if its a valid token in which give us access to the user's id used during the token creation
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    //find user who has the provided id and token as well
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }
    //set the found user from the db in the request object so the further routers don't have to go to the db once again
    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = auth;
