const express = require('express');
const app = express();
const auctionRoutes = require('./api/routes/auction');
const bidRoutes = require('./api/routes/bid');
const morgan = require('morgan');

app.use('/auction', auctionRoutes);
app.use('/bid', bidRoutes);

module.exports = app;