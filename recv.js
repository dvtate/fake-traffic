const express = require('express');
const app = express();

const util = require('./util');

app.post('/secure', async (req, res) => {
    res.send(util.randData(50000));
});


// Send a bunch of garbage to crawlers
const crawlerRoute = (req, res) => {
    res.send(util.randData());
};
app.get('*', crawlerRoute);
app.post('*', crawlerRoute);

const port = process.env.PORT || 22121;
app.listen(port, () => { 
    console.log('now listening on port ', port);
});