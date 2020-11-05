const express = require('express');

const app = express();
const PORT = 4000;

app.use(express.static('./static/'));
app.use(express.static('./'));

app.get('/tests/*', function (req, res) {
    //var code = req.body.code;
    //console.log(req);
    res.sendFile(__dirname + '/static/tests/tests.html');
});

app.get('*', function (req, res) {
    //var code = req.body.code;
    //console.log(req);
    res.sendFile(__dirname + '/static/index.html');
});

app.listen(PORT, function () {
    console.log(`App started on port ${PORT}!`);
}); 