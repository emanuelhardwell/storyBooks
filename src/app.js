/*  */
/*  */
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const exphbs = require("express-handlebars");
const morgan = require("morgan");
const methodOverride = require("method-override");
const session = require("express-session");
const mongoose = require("mongoose");
const passport = require("passport");

// required
dotenv.config({ path: "./src/configs/config.env" });
require("./configs/db");

// config the app
const app = express();

app.set("port", process.env.PORT || 3000);

// config the engine
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    helpers: path.join(__dirname, "helpers/helper"),
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

// MIDDLEWARE development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// static files
app.use(express.static(path.join(__dirname, "public")));

// get routes
app.use("/", require("./routes/index.routes"));
app.use("/auth", require("./routes/auth.routes"));
app.use("/stories", require("./routes/stori.routes"));

// listen the server
app.listen(
  app.get("port"),
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${app.get("port")}`
  )
);
