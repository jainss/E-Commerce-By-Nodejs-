const http = require("http");
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const path= require('path');
const rooDir= require('./util/path');
const errorController = require('./controllers/error');

app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(path.join(rooDir,'public')))

    
app.set('view engine', 'ejs');
app.set('views','views');

app.use('/admin',adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404); 

app.listen(3000);
