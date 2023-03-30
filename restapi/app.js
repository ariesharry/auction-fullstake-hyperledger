const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const auctionRoutes = require('./api/routes/auction');
const bidRoutes = require('./api/routes/bid');
const queryAuction  = require('./api/routes/queryAuction');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/auction', auctionRoutes);
app.use('/bid', bidRoutes);
app.use('/queryAuction', queryAuction);

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