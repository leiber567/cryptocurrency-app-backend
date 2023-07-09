const express = require('express');
const api = express.Router();
const CryptoAssetsRouter = require('./CryptoAssetsRoutes');
const EarningsRouter = require('./EarningsRoutes');

api.use('/v1/crypto-assets', CryptoAssetsRouter);
api.use('/v1/earnings', EarningsRouter);

module.exports = api;
