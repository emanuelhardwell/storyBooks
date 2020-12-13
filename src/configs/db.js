/*  */
/*  */
const mongoose = require("mongoose");
const { database } = require("./key");

mongoose
  .connect(database.URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((db) => {
    console.log("DB is connected succesfully ..................");
  })
  .catch((err) => {
    console.error(err);
  });
