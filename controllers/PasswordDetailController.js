const PasswordCategoryModel = require("../Models/passwordcategories");
const PasswordDetailsModel = require("../Models/passworddetails");

const addPasswordDetails = async (req, res) => {
  const user = req.user;
  const id = user._id;
  PasswordCategoryModel.find({ userID: id }, (err, data) => {
    if (err) console.log(err);
    res.render("add_password_details", { data: data });
  });
};

const postPasswordDetails = async (req, res) => {
  const user = req.user;
  const id = user._id;

  const { password_cat_name, password_details } = req.body;
  // validate request
  if (!password_cat_name || !password_details) {
    req.flash("error", "fields are required");
    return res.redirect("/add_password_details");
  }

  const passwordDetailsModel = new PasswordDetailsModel({
    userID: id,
    password_cat_name,
    password_details,
  });

  // Saving Password details in Database
  passwordDetailsModel
    .save()
    .then(() => {
      req.flash("success", "Password Added Successfully");
      res.redirect("/add_password_details");
    })
    .catch((err) => {
      console.log(err);
      req.flash("error", "Something Went Wrong");
      res.redirect("/add_password_details");
    });
};

const passwordDetails = async (req, res) => {
  const user = req.user;
  const id = user._id;
  const perPage = 5;
  const page = req.params.page || 1;
  PasswordDetailsModel.find({ userID: id })
    .skip(perPage * page - perPage)
    .limit(perPage)
    .sort({ updatedAt: -1 })
    .exec(function (err, data) {
      if (err) throw err;
      PasswordDetailsModel.countDocuments({ userID: id }).exec((err, count) => {
        if (err) throw err;
        res.render("view_password_details", {
          data: data,
          count: count,
          current: page,
          pages: Math.ceil(count / perPage),
        });
      });
    });
};

// editing Records
const editPassword = (req, res) => {
  const passwordId = req.params.id;
  //console.log(passwordId);
  PasswordDetailsModel.findById(passwordId, (err, data) => {
    //console.log(data);
    if (err) console.log(err);
    res.render("edit_password_details", { data: data });
  });
};

const postEditPassword = (req, res) => {
  const { hiddenInput, password_cat_name, password_details } = req.body;
  //console.log(hiddenInput, password_cat_name, password_details);
  PasswordDetailsModel.findByIdAndUpdate(
    hiddenInput,
    {
      password_cat_name,
      password_details,
    },
    (err, data) => {
      if (err) console.log(err);
      res.redirect("/view_password_details");
    }
  );
};

// Deleting Records From DB
const deletePassword = (req, res) => {
  const passwordId = req.params.id;
  //console.log(passCatId);
  PasswordDetailsModel.findByIdAndDelete(passwordId, (err) => {
    if (err) console.log(err);
    res.redirect("/view_password_details");
  });
};

module.exports = {
  addPasswordDetails,
  postPasswordDetails,
  passwordDetails,
  editPassword,
  postEditPassword,
  deletePassword,
};
