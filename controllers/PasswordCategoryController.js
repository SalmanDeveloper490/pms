const PasswordCategoryModel = require("../Models/passwordcategories");

const passswordCategoryView = (req, res) => {
  res.render("add_password_category");
};

const addPasswordCategory = async (req, res) => {
  const user = req.user;
  const id = user._id;
  //console.log(userId)
  const { pass_cat_name } = req.body;
  // validate request
  if (!pass_cat_name) {
    req.flash("error", "fields are required");
    return res.redirect("/add_password_category");
  }

  // Create Password Category
  const passwordCategory = new PasswordCategoryModel({
    userID: id,
    pass_cat_name,
  });

  // Saving Password Category in Database
  passwordCategory
    .save()
    .then(() => {
      req.flash("success", "Password Category Added Successfully");
      res.redirect("/add_password_category");
    })
    .catch((err) => {
      req.flash("error", "Something Went Wrong");
      res.redirect("/add_password_category");
    });
};

const viewPasswordCategory = async (req, res) => {
  const user = req.user;
  const id = user._id;
  const perPage = 5;
  const page = req.params.page || 1;
  PasswordCategoryModel.find({ userID: id })
    .skip(perPage * page - perPage)
    .limit(perPage)
    .sort({ updatedAt: -1 })
    .exec(function (err, data) {
      if (err) throw err;
      PasswordCategoryModel.countDocuments({ userID: id }).exec(
        (err, count) => {
          if (err) throw err;
          res.render("view_password_categories", {
            data: data,
            count: count,
            current: page,
            pages: Math.ceil(count / perPage),
          });
        }
      );
    });
};

// const passwordCategoryPagination = async (req, res) => {
//   const user = req.user;
//   const id = user._id;
//   console.log(id);
//   const perPage = 5;
//   const page = req.params.page || 1;
//   PasswordCategoryModel.find({ userID: id })
//     .skip(perPage * page - perPage)
//     .limit(perPage)
//     .sort({ updatedAt: -1 })
//     .exec(function (err, data) {
//       if (err) throw err;
//       PasswordCategoryModel.countDocuments({ userID: id }).exec(
//         (err, count) => {
//           if (err) throw err;
//           res.render("view_password_categories", {
//             data: data,
//             count: count,
//             current: page,
//             pages: Math.ceil(count / perPage),
//           });
//         }
//       );
//     });
// };

// editing Records
const editPasswordCategory = (req, res) => {
  const passCatId = req.params.id;
  //console.log(passCatId);
  PasswordCategoryModel.findById(passCatId, (err, viewPassCategories) => {
    if (err) console.log(err);
    res.render("edit_password_category", { viewPassCategories });
  });
};

const postEditPasswordCategory = (req, res) => {
  const { hidden_id, pass_cat_name } = req.body;
  //console.log(hidden_id, pass_cat_name);
  PasswordCategoryModel.findByIdAndUpdate(
    hidden_id,
    { pass_cat_name },
    (err, data) => {
      if (err) console.log(err);
      res.redirect("/view_password_categories");
    }
  );
};

// Deleting Records From DB
const deletePasswordCategory = (req, res) => {
  const passCatId = req.params.id;
  //console.log(passCatId);
  PasswordCategoryModel.findByIdAndDelete(passCatId, (err) => {
    if (err) console.log(err);
    res.redirect("/view_password_categories");
  });
};

module.exports = {
  passswordCategoryView,
  addPasswordCategory,
  viewPasswordCategory,
  // passwordCategoryPagination,
  editPasswordCategory,
  postEditPasswordCategory,
  deletePasswordCategory,
};
