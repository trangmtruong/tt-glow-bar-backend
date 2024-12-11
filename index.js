const express = require("express");
const app = express();

const { PORT = 3000 } = process.env;

process.env;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}....`);
});
