const request = require('supertest');
const axios = require('axios');
const Server = require('../../server');
const server = new Server();

jest.mock('axios');

describe('Crypto Assets Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('Should return the detail of earning for each App coin', async () => {
    axios.get.mockResolvedValue({
      data: {
        'data': [
          {
            id: '1',
            slug: 'bitcoin',
            symbol: 'BTC',
            metrics: { market_data: { price_usd: 1 } },
          },
          {
            id: '2',
            slug: 'ethereum',
            symbol: 'ETH',
            metrics: { market_data: { price_usd: 2 } },
          },
          {
            id: '3',
            slug: 'cardano',
            symbol: 'ADA',
            metrics: { market_data: { price_usd: 3 } },
          },
        ],
      },
    });
    const res = await request(server.app).
      post('/api/v1/earnings/cryptocurrency').
      send({
        usdValue: 100,
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data.earningTotal).toBeGreaterThan(0);
  });
  it('Should return bad request if usdValue is not sent', async () => {
    axios.get.mockResolvedValue({
      data: {
        'data': [],
      },
    });
    const res = await request(server.app).
      post('/api/v1/earnings/cryptocurrency').
      send();
    expect(res.statusCode).toEqual(400);
    expect(res.body.success).toBe(false);
  });
});
