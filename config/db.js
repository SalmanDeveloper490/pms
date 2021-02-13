// import mongoose module
const mongoose = require("mongoose");

//Set up default mongoose connection
const mongoDB =
  "mongodb+srv://mongodbuser:dev12345@cluster0.vb2nf.mongodb.net/pms?retryWrites=true&w=majority";
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

//Get the default connection
const db = mongoose.connection;

// connection events
// when database connected
db.on("connected", () => {
  console.log("Database Connected");
});

// when database not connected
db.on("error", (err) => {
  console.log(`Database Not Connected ${err}`);
});

module.exports = db;
