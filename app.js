const http = require("http");
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const path = require("path");
const rooDir = require("./util/path");
const errorController = require("./controllers/error");
const User = require("./models/user");
const { use } = require("./routes/admin");
const mongoose = require("mongoose");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(path.join(rooDir, "public")));

app.use((req, res, next) => {
  User.findById("63986e053098eb571e3fe586")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://jainss:jainss@cluster0.cefsduq.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Sahil Jain",
          email: "sj2394108@gmail.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
