const fs = require('fs');
const path = require('path');
const cryptoCurrenciesFilePath = path.join(__dirname, 'cryptocurrencies.csv');

const readCryptocurrenciesData = () => {
  return new Promise((resolve) => {
    fs.readFile(cryptoCurrenciesFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading crypto currencies:', err);
        resolve([]);
      } else {
        const lines = data.split('\n');
        const headers = lines[0].split(',');
        const result = [];
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',');
          if (values.length === headers.length) {
            const obj = {};
            for (let j = 0; j < headers.length; j++) {
              obj[headers[j]] = values[j];
            }
            result.push(obj);
          }
        }
        resolve(result);
      }
    });
  });
};

const getAppCryptosData = async () => await readCryptocurrenciesData();

const getAppCryptosSymbol = async () => (await readCryptocurrenciesData()).map(
  appCryptoData => appCryptoData.symbol,
);
const getAppCryptosSlug = async () => (await readCryptocurrenciesData()).map(
  appCryptoData => appCryptoData.slug,
);
const MESSARI_API_BASE_URL = process.env.MESSARI_API_BASE_URL;
const MESSARI_IMAGES_BASE_URL = process.env.MESSARI_IMAGES_BASE_URL;
const MESSARI_ASSETS_PATH = '/v2/assets?fields=id,slug,symbol,metrics/market_data/price_usd';
const MESSARI_ASSETS_MARKETS_PATH = '/v1/markets/prices-legacy';

module.exports = {
  getAppCryptosData,
  getAppCryptosSymbol,
  getAppCryptosSlug,
  MESSARI_API_BASE_URL,
  MESSARI_IMAGES_BASE_URL,
  MESSARI_ASSETS_PATH,
  MESSARI_ASSETS_MARKETS_PATH,
};
