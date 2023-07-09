const { Router } = require('express');
const router = Router();
const {
  getCryptoAssets,
  getCryptoAssetsMarkets,
} = require('../controllers/CryptoAssetsController');

router.get('',
  getCryptoAssets,
);

router.get('/markets',
  getCryptoAssetsMarkets,
);

module.exports = router;
