const express = require('express');
const http = require('http');

class FakeFlickerstrip {
  constructor() {
    const app = express();
    this.server = http.createServer(app).listen();
    app.set('port', this.server.address().port);

    this.state = {
      on: false,
    };

    app.get('/power/off', (req, res) => {
      this.state.on = false;
      res.json({ ok: true });
    });

    app.get('/power/on', (req, res) => {
      this.state.on = true;
      res.json({ ok: true });
    });
  }

  get host() {
    return `localhost:${this.server.address().port}`;
  }
}

module.exports = FakeFlickerstrip;
