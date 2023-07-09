const axios = require('axios');
const {
  APP_CRYPTOS_DATA,
  APP_CRYPTOS_SYMBOL,
  APP_CRYPTOS_SLUG,
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
      return cryptoAssets.filter(
        currentCryptoAsset => APP_CRYPTOS_SYMBOL.indexOf(
          currentCryptoAsset.symbol) >= 0,
      );
    } catch (error) {
      this.parseApiError(error);
    }
  }

  async getAppCryptoAssetsPriceUsd () {
    const appCryptoAssets = await this.getAppCryptoAssets();
    return appCryptoAssets.map(currentCryptoAsset => {
      const cryptoAssetAppData = APP_CRYPTOS_DATA.find(cryptoData =>
        currentCryptoAsset.symbol === cryptoData.symbol,
      );
      return {
        symbol: currentCryptoAsset.symbol,
        priceUsd: currentCryptoAsset.metrics.market_data.price_usd,
        monthlyReturn: cryptoAssetAppData ? cryptoAssetAppData.monthlyReturn : 0
      }
    });
  }

  async getAppCryptoAssetsMarkets () {
    try {
      const response = await axios.get(
        `${this.apiUrl}${MESSARI_ASSETS_MARKETS_PATH}`,
      );
      const cryptoAssets = response.data.data;
      return cryptoAssets.filter(
        currentCryptoAsset => APP_CRYPTOS_SLUG.indexOf(
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
