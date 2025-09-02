const express = require('express');
const app = express();

const util = require('./util');

function getMimeType(acceptHeader) {
    if (!acceptHeader)
        return 'text/html';
    const t = acceptHeader.split(',').map(s => s.split(';')).map(s => s[0])[0];
    if (!t || t[0] === '*')
        return 'text/html';
    const [mt, st] = t.split('/');
    if (st !== '*')
        return mt + '/' + st;

    // Any subtype
    switch (mt) {
    case 'image': return 'image/png';
    case 'text': return 'text/html';
    case 'application': return 'application/octet-stream';
    case 'audio': return 'audio/acc';
    case 'video': return 'video/ogg';
    case 'font': return 'font/otf';
    default: return mt + '/html';
    }
}

if (process.env.BOMB)
    app.use((req, res, next) => {
        const contentType = getMimeType(req.get('Accept'));
        res.setHeader('Content-Encoding', 'gzip');
        res.setHeader('Content-Type', contentType);
        res.send(util.zipBombBuffer);
        console.log(req.ip,
            '\n\t- ', req.path,
            '\n\t- ', req.get('Accept') || '*/*', '\t-\t', contentType);
    });
else
    app.use((req, res, next) => {
        res.send(util.randData(50000));
        console.log(req.ip, '-\t', req.path);
    });

const port = process.env.PORT || 22121;
app.listen(port, () => { 
    console.log('now listening on port ', port);
});
