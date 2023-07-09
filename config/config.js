const APP_CRYPTOS_DATA = [
  { symbol: 'BTC', slug: 'bitcoin', monthlyReturn: 0.05 },
  { symbol: 'ETH', slug: 'ethereum', monthlyReturn: 0.042 },
  { symbol: 'ADA', slug: 'cardano', monthlyReturn: 0.01 },
];

const APP_CRYPTOS_SYMBOL = APP_CRYPTOS_DATA.map(
  appCryptoData => appCryptoData.symbol,
);
const APP_CRYPTOS_SLUG = APP_CRYPTOS_DATA.map(
  appCryptoData => appCryptoData.slug,
);
const MESSARI_API_BASE_URL = process.env.MESSARI_API_BASE_URL;
const MESSARI_IMAGES_BASE_URL = process.env.MESSARI_IMAGES_BASE_URL;
const MESSARI_ASSETS_PATH = '/v2/assets?fields=id,slug,symbol,metrics/market_data/price_usd';
const MESSARI_ASSETS_MARKETS_PATH = '/v1/markets/prices-legacy';

module.exports = {
  APP_CRYPTOS_DATA,
  APP_CRYPTOS_SYMBOL,
  APP_CRYPTOS_SLUG,
  MESSARI_API_BASE_URL,
  MESSARI_IMAGES_BASE_URL,
  MESSARI_ASSETS_PATH,
  MESSARI_ASSETS_MARKETS_PATH,
};
