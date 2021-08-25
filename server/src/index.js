const express = require('express');
const HttpError = require('http-errors');
const OhmsModel = require('./ohms.model');

const app = express();

app.use(express.json())

app.use(async (req, res, next) => {
    const { DELAY_SIMULATE: delaySimulate } = process.env;
    if (delaySimulate) await new Promise(r => setTimeout(r, Number(delaySimulate)));
    next();
});


app.get('/ohms/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const ohm = await OhmsModel.getById(id);
        if (!ohm) throw new HttpError.NotFound(`Item ${id} not found!`);
        res.send(ohm);
    } catch (error) {
        next(error);
    }
});

app.patch('/ohms/:id', async (req, res, next) => {
    try {
        const ohm = await OhmsModel.getById(req.params.id);
        if (!ohm) throw new HttpError.NotFound(`Item ${id} not found!`);

        const { status, reason } = req.body;
        const result = await OhmsModel.updateStatus(ohm, status, reason);
        res.json(result);
    } catch (error) {
        if (error instanceof OhmsModel.ValidationError) {
            next(new HttpError.BadRequest(error.message))
        } else {
            next(new HttpError.InternalServerError(error.message))
        }
    }
});

app.use(function (error, req, res, next) {
    if (HttpError.isHttpError(error)) {
        const { statusCode, message, detail } = error;
        res.status(statusCode).json({ message, detail });
        return;
    }
    res.status(500).json({ message: error.message });
})


app.listen(3000, () => console.log('listening on port 3000'));

