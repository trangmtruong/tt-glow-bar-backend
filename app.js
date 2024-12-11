const express = require("express");
const mongoose = require("mongoose");

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

//http://localhost:3001/
