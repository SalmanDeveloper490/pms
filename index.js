const express = require("express");
require("dotenv").config();
const app = express();
const db = require("./config/db");
const port = process.env.PORT || 5000;
const path = require("path");
const authRoutes = require("./routes/auth_routes");
const passwordCatRoutes = require("./routes/password_category_routes");
const passwordDetailRoutes = require("./routes/password_details_routes");
const pageNotFound = require("./routes/not_found");
const flash = require("express-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");

// Set Template Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// Path to our public directory
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

// Connect Flash
app.use(flash());

app.use(cookieParser());
// Express Session
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);

// passport config
const passportInit = require("./config/passport");
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

// global middleware
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// routes
app.use(authRoutes);
app.use(passwordCatRoutes);
app.use(passwordDetailRoutes);
app.use(pageNotFound);
// routes

// listening Server
app.listen(port, () => {
  console.log(`Server Runing On Port ${port}`);
});
