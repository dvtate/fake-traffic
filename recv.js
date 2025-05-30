const express = require('express');
const app = express();

const util = require('./util');

app.use((req, res, next) => {
    res.send(util.randData(50000));
    console.log(req.ip, '-\t', req.path);
});

const port = process.env.PORT || 22121;
app.listen(port, () => { 
    console.log('now listening on port ', port);
});
