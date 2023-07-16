const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const auctionRoutes = require('./api/routes/auction');
const bidRoutes = require('./api/routes/bid');
const submitBid = require('./api/routes/submitBid');
const queryAuction  = require('./api/routes/queryAuction');
const queryBid =  require('./api/routes/queryBid');
const revealBid = require('./api/routes/revealBid');
const closeAuction = require('./api/routes/closeAuction');
const endAuction =  require('./api/routes/endAuction');
const addCommodity = require('./api/routes/addCommodity');
const queryCommodity = require('./api/routes/queryCommodity');
const queryCommodityId = require('./api/routes/queryCommodityId');
const queryAuctionAll  = require('./api/routes/queryAuctionAll');
const { application } = require('express');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT', 'POST', 'PATCH', 'DELETE');
        return res.status(200).json({});
    }
    next();
});


app.use('/auction', auctionRoutes);
app.use('/queryAuction', queryAuction);
app.use('/bid', bidRoutes);
app.use('/queryBid', queryBid);
app.use('/submitBid', submitBid);
app.use('/revealBid', revealBid);
app.use('/closeAuction', closeAuction);
app.use('/endAuction', endAuction);
app.use('/addCommodity', addCommodity);
app.use('/queryCommodity', queryCommodity);
app.use('/queryCommodityId', queryCommodityId);
app.use('/queryAuctionAll', queryAuctionAll);


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