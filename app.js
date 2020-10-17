const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const errorsController = require("./controllers/errors");
const db = require("./utility/database");

const app = express();

// set() is a method for a global configuration value
// details https://expressjs.com/en/4x/api.html#app.set
app.set("view engine", "ejs");
// path where to find this templates, second argument is our directory
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRouter = require("./routes/shop");

// to be able parse request body
//request.body
app.use(bodyParser.urlencoded({ extended: false }));

// to serve files statically it means not handled by the express router
// or other middleware but instead directly forwarder to the file system
// for this we use static() which serves static files through the new middleware app.use()
app.use(express.static(path.join(__dirname, "public")));

// the same as http://localhost:3000/admin
app.use("/admin", adminRoutes);

app.use(shopRouter);

// we don't use path because it by default
app.use(errorsController.get404);

app.listen(3000);
