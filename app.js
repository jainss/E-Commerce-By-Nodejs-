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
const authRoutes = require("./routes/auth");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const MONGODBURI="mongodb+srv://jainss:jainss@cluster0.cefsduq.mongodb.net/shop";
const store=new MongoDBStore({
  uri:MONGODBURI,
  collection:"sessions",
})

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(path.join(rooDir, "public")));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});


app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    MONGODBURI
  )
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
