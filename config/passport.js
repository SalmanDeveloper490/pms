const LocalStrategy = require("passport-local").Strategy;
const User = require("../Models/user");
const bcrypt = require("bcrypt");

const passportInit = (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        // check if email exists
        const user = await User.findOne({ email: email });

        if (!user) {
          return done(null, false, { message: "No User With this Email" });
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;

          if (isMatch) {
            return done(null, user, { message: "Logged in succesfully" });
          }
          return done(null, false, { message: "Wrong username and password" });
        });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};

module.exports = passportInit;
