const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middlewares/errorHandler');

class Server {
  constructor () {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.apiPrefix = '/api';
    this.routes();
    this.notFound();
  }

  routes () {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(this.apiPrefix, require('./routes'));
    this.app.use(errorHandler);
  }

  notFound () {
    this.app.use((request, response, next) => {
      return response.status(404).json({
        success: false,
        error: 'Not Found',
      });
    });
  }

  listen () {
    this.app.listen(this.port, () => {
      console.log('✔ Express server listening on port %d', this.port);
    });
  }
}

module.exports = Server;
