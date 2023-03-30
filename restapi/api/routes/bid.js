const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'success bid get broo!'
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'success bid post broo!'
    });
});

module.exports = router;