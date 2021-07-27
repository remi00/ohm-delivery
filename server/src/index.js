const shortid = require('shortid')
var express = require('express');
var app = express();
const bodyParser = require('body-parser')
const Utils = require('./utils');
app.use(bodyParser.json())

const { DELAY_SIMULATE: delaySimulate } = process.env;

app.use(async (req, res, next) => {
    if (delaySimulate) await new Promise(r => setTimeout(r, Number(delaySimulate)));
    next();
});

function serve() {
    app.get('/ohms/:id', async (req, res) => {
        const ohm = await Utils.getOhmById(req.params.id);
        if (!ohm) res.status(404).send({ message: 'Item not found!' }).end();
        else res.send(ohm);
    });
    app.listen(3000, () => console.log('listening on port 3000'));
}

serve();
