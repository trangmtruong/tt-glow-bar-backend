const express = require("express");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");

const app = express();

const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}....`);
});
mongoose
  .connect("mongodb://127.0.0.1:27017/tt_glow_bar")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

//a middleware that enables you to parse the body
//always put app.use before router
app.use(express.json());
//app.use allows us to register routes & middlewares
app.use("/", indexRouter);

//http://localhost:3001/
