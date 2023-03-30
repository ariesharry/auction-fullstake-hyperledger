const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'success get broo!'
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'success post broo!'
    });
});

module.exports = router;