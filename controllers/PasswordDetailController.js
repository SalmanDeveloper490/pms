const PasswordCategoryModel = require("../Models/passwordcategories");
const PasswordDetailsModel = require("../Models/passworddetails");

const addPasswordDetails = (req, res) => {
  PasswordCategoryModel.find({}, (err, data) => {
    if (err) console.log(err);
    res.render("add_password_details", { data: data });
  });
};

const postPasswordDetails = (req, res) => {
  const { password_cat_name, password_details } = req.body;
  // validate request
  if (!password_cat_name || !password_details) {
    req.flash("error", "fields are required");
    return res.redirect("/add_password_details");
  }

  const passwordDetailsModel = new PasswordDetailsModel({
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

const passwordDetails = (req, res) => {
  const perPage = 5;
  const page = req.params.page || 1;
  PasswordDetailsModel.find({})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .sort({ updatedAt: -1 })
    .exec(function (err, data) {
      if (err) throw err;
      PasswordDetailsModel.countDocuments({}).exec((err, count) => {
        if (err) throw err;
        res.render("view_password_details", {
          data: data,
          current: page,
          pages: Math.ceil(count / perPage),
        });
      });
    });
};

const passwordPagination = (req, res) => {
  const perPage = 5;
  const page = req.params.page || 1;
  PasswordDetailsModel.find({})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .sort({ updatedAt: -1 })
    .exec(function (err, data) {
      if (err) throw err;
      PasswordDetailsModel.countDocuments({}).exec((err, count) => {
        if (err) throw err;
        res.render("view_password_details", {
          data: data,
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
  passwordPagination,
  editPassword,
  postEditPassword,
  deletePassword,
};
