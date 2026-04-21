const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/user")
.then(() => {
  console.log("DB Connected Successfully");
})
.catch((err) => {
  console.log("DB Not Connected", err);
});