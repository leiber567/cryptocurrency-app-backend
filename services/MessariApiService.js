const axios = require('axios');
const {
  getAppCryptosData,
  getAppCryptosSymbol,
  getAppCryptosSlug,
  MESSARI_API_BASE_URL,
  MESSARI_ASSETS_PATH,
  MESSARI_ASSETS_MARKETS_PATH
} = require('../config/config');

class MessariApiService {

  constructor () {
    this.apiUrl = MESSARI_API_BASE_URL;
  }

  async getAppCryptoAssets () {
    try {
      const response = await axios.get(
        `${this.apiUrl}${MESSARI_ASSETS_PATH}`,
      );
      const cryptoAssets = response.data.data;
      const appCryptosSymbol = await getAppCryptosSymbol();
      return cryptoAssets.filter(
        currentCryptoAsset => appCryptosSymbol.indexOf(
          currentCryptoAsset.symbol) >= 0,
      );
    } catch (error) {
      this.parseApiError(error);
    }
  }

  async getAppCryptoAssetsPriceUsd () {
    const appCryptoAssets = await this.getAppCryptoAssets();
    const appCryptosData = await getAppCryptosData();
    return appCryptoAssets.map(currentCryptoAsset => {
      const cryptoAssetAppData = appCryptosData.find(cryptoData =>
        currentCryptoAsset.symbol === cryptoData.symbol,
      );
      return {
        symbol: currentCryptoAsset.symbol,
        priceUsd: currentCryptoAsset.metrics.market_data.price_usd,
        monthlyReturn: cryptoAssetAppData ? Number(cryptoAssetAppData.monthlyReturn) : 0
      }
    });
  }

  async getAppCryptoAssetsMarkets () {
    try {
      const response = await axios.get(
        `${this.apiUrl}${MESSARI_ASSETS_MARKETS_PATH}`,
      );
      const cryptoAssets = response.data.data;
      const appCryptosSlug = await getAppCryptosSlug();
      return cryptoAssets.filter(
        currentCryptoAsset => appCryptosSlug.indexOf(
          currentCryptoAsset.slug) >= 0,
      );
    } catch (error) {
      this.parseApiError(error);
    }
  }

  parseApiError (error) {
    const status = error.response?.status;
    const errorData = error.response?.data;
    let errorMessage = error.message || 'Error in Messari API';
    if (errorData && errorData.status && errorData.status.error_message) {
      errorMessage = errorData.status.error_message;
    }
    throw { status, message: errorMessage };
  }
}

module.exports = MessariApiService;
