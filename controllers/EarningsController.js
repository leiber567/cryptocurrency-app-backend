const MessariApiService = require('../services/MessariApiService');

const getCryptoCurrencyEarnings = async (request, response, next) => {
  try {
    const { usdValue } = request.body;
    const MessariApi = new MessariApiService();
    let appCryptoAssets = await MessariApi.getAppCryptoAssetsPriceUsd();
    const earningsDetail = {};
    let earningTotal = 0;
    for (const currentAppCryptoAsset of appCryptoAssets) {
      const buyCoinValue = usdValue / currentAppCryptoAsset.priceUsd;
      const yearCoinValue = currentAppCryptoAsset.priceUsd +
        (currentAppCryptoAsset.priceUsd * currentAppCryptoAsset.monthlyReturn *
          12);
      const yearEarningUsdValue = buyCoinValue * yearCoinValue;
      earningTotal += (yearEarningUsdValue - usdValue);
      earningsDetail[currentAppCryptoAsset.symbol] = {
        coinPriceUsd: currentAppCryptoAsset.priceUsd,
        monthlyReturn: currentAppCryptoAsset.monthlyReturn,
        earningCoin: yearCoinValue,
        earningBalance: yearEarningUsdValue,
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
