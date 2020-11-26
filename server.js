const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static("dist"));

app.get("*", function(req, res) {
  res.sendFile(__dirname + "/dist/index.html");
});

app.listen(PORT, function() {
  console.log(`App started on port ${PORT}!`);
});
