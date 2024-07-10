const { User } = require("../models/UserModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//@desc Log in  to app
//@route POST /api/user/login
//@access public
const loginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  const user = await User.findOne({ where: { email } });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      },
      process.env.ACCESSTOKEN_SECRETKEY,
      { expiresIn: "15m" }
    );
    res.status(200).json({
      username: user.username,
      accessToken,
    });
  } else {
    res.status(401);
    throw new Error("Email or Password is Invalid!");
  }
};

//@desc Create a new user
//@route POST /api/user/register
//@access public
const registerController = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  //check email
  if (
    email.slice(0, email.indexOf("@")).length < 1 ||
    email.slice(email.indexOf("@") + 1, email.indexOf(".")).length < 1 ||
    email.slice(email.indexOf(".") + 1).length < 1
  ) {
    res.status(400);
    throw new Error("Invalid email format!");
  }
  //check if it is exist
  const userAvaliable = await User.findOne({ where: { email: email } });
  console.log("############ =>", userAvaliable?.email);
  console.log("############ =>", userAvaliable?.dataValues);
  console.log(Boolean(userAvaliable));
  if (userAvaliable) {
    res.status(400);
    throw new Error("User is already created!");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  console.log(newUser.dataValues);
  res.status(201).json({
    error: false,
    message: " A new user is created!",
    new_user: newUser.dataValues,
  });
};

//@desc get the current user
//@route POST /api/user/current
//@access private
const currentController = async (req, res) => {
  res.status(200).json({
    username:req.username,
    accessToken:req.accesstoken,
  });
};

module.exports = {
  loginController,
  registerController,
  currentController,
};
