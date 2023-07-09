const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { validateFields } = require('../middlewares/fieldValidator');
const { getCryptoCurrencyEarnings } = require(
  '../controllers/EarningsController');

router.post('/cryptocurrency',
  [
    check('usdValue', 'Required').isNumeric('This must be a number'),
    validateFields,
  ],
  getCryptoCurrencyEarnings,
);

module.exports = router;
