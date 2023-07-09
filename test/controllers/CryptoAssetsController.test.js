const request = require('supertest');
const axios = require('axios');
const Server = require('../../server');
const server = new Server();

jest.mock('axios');

describe('Crypto Assets Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('Should get a empty list of crypto assets', async () => {
    axios.get.mockResolvedValue({
      data: {
        'data': [],
      },
    });
    const res = await request(server.app).get('/api/v1/crypto-assets').send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data.length).toEqual(0);
  });
});
