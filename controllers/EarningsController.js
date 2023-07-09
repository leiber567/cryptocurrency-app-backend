const MessariApiService = require('../services/MessariApiService');

const getCryptoCurrencyEarnings = async (request, response, next) => {
  try {
    const { usdValue } = request.body;
    const MessariApi = new MessariApiService();
    let appCryptoAssets = await MessariApi.getAppCryptoAssetsPriceUsd();
    const earningsDetail = {};
    let earningTotal = usdValue;
    for (const currentAppCryptoAsset of appCryptoAssets) {
      const earningCoin = usdValue *
        (1 + currentAppCryptoAsset.monthlyReturn) ** 12;
      const earningBalance = usdValue + earningCoin *
        currentAppCryptoAsset.priceUsd;
      earningTotal += earningBalance;
      earningsDetail[currentAppCryptoAsset.symbol] = {
        coinPriceUsd: currentAppCryptoAsset.priceUsd,
        monthlyReturn: currentAppCryptoAsset.monthlyReturn,
        earningCoin,
        earningBalance,
      };
    }
    response.status(200).json({
      data: { ...earningsDetail, earningTotal },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getCryptoCurrencyEarnings,
};
