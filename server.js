const express = require("express");

const app = express();
const PORT = 4000;

app.use(express.static("./dist/"));
app.use(express.static("./"));

app.get("*", function (req, res) {
    res.sendFile(__dirname + "/dist/index.html");
});

app.listen(PORT, function () {
    console.log(`App started on port ${PORT}!`);
}); 