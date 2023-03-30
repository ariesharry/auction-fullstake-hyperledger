const express = require('express');
const app = express();
const morgan = require('morgan');

const auctionRoutes = require('./api/routes/auction');
const bidRoutes = require('./api/routes/bid');

app.use(morgan('dev'));
app.use('/auction', auctionRoutes);
app.use('/bid', bidRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found!');
    error.status= 404;
    next(error);

});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }

    });

});

module.exports = app;