const MessariApiService = require('../services/MessariApiService');
const { MESSARI_IMAGES_BASE_URL, MESSARI_API_BASE_URL } = require('../config/config');

const getCryptoAssets = async (request, response, next) => {
  try {
    const MessariApi = new MessariApiService();
    let appCryptoAssets = await MessariApi.getAppCryptoAssets();
    appCryptoAssets = appCryptoAssets.map(cryptoAsset => (
      {
        ...cryptoAsset,
        image: `${MESSARI_IMAGES_BASE_URL}/${cryptoAsset.id}/64.png?v=2`,
      }
    ));
    response.status(200).json({
      data: appCryptoAssets,
    });
  } catch (error) {
    return next(error);
  }
};

const getCryptoAssetsMarkets = async (request, response, next) => {
  try {
    const MessariApi = new MessariApiService();
    const cryptoAssetsMarketsData = await MessariApi.getAppCryptoAssetsMarkets();
    const appCryptoAssetsMarkets = cryptoAssetsMarketsData.map(cryptoAsset => ({
      ...cryptoAsset,
      last7daysTrend: `${MESSARI_API_BASE_URL}/v1/assets/${cryptoAsset.id}/metrics/market-data/history/sl.png?width=140&height=30`,
      image: `${MESSARI_IMAGES_BASE_URL}/${cryptoAsset.id}/32.png?v=2`,
    }))
    response.status(200).json({
      data: appCryptoAssetsMarkets,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getCryptoAssets,
  getCryptoAssetsMarkets,
};
