const User = require("../Models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");

const homePage = (req, res) => {
  res.render("index");
};

const loginForm = (req, res) => {
  res.render("login");
};

const registerForm = (req, res) => {
  res.render("register");
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  // validate request
  if (!username || !email || !password) {
    req.flash("error", "All fields are required");
    req.flash("username", "username");
    req.flash("email", "email");
    return res.redirect("/register");
  }

  // checking if email already exits
  User.exists({ email: email }, (err, result) => {
    if (result) {
      req.flash("error", "Email already taken");
      req.flash("username", "username");
      req.flash("email", "email");
      return res.redirect("/register");
    }
  });

  // Hashed Password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create User
  const user = new User({
    username,
    email,
    password: hashedPassword,
  });

  // saving user in database
  user
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      req.flash("error", "Something Went Wrong");
      req.flash("username", "username");
      req.flash("email", "email");
      res.redirect("/register");
    });
};

const loginUser = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      req.flash("error", info.message);
      return next(err);
    }

    if (!user) {
      req.flash("error", info.message);
      return res.redirect("/");
    }

    req.logIn(user, (err) => {
      if (err) {
        req.flash("error", info.message);
        return next(err);
      }
      return res.redirect("/view_password_details");
    });
  })(req, res, next);
};

const logout = (req, res) => {
  req.logout();
  res.redirect("/");
};

module.exports = {
  homePage,
  loginForm,
  registerForm,
  registerUser,
  loginUser,
  logout,
};
