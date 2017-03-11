const Flickerstrip = require('../');
const FakeFlickerstrip = require('./mocks/flickerstrip');
const assert = require('assert');

describe('Flickerstrip', () => {
  let fakeFlickerstrip;
  let flickerstrip;

  beforeAll(() => {
    fakeFlickerstrip = new FakeFlickerstrip();
    flickerstrip = new Flickerstrip({
      ip: fakeFlickerstrip.host,
    });
  });

  afterAll(() => {
    fakeFlickerstrip.server.close();
  });

  describe('#turnOn', () => {
    test('should turn on the Flickerstrip', () => flickerstrip.turnOn().then(() => {
      assert(fakeFlickerstrip.state.on);
      return Promise.resolve();
    }));
  });

  describe('#turnOff', () => {
    test('should turn off the Flickerstrip', () => flickerstrip.turnOff().then(() => {
      assert(!fakeFlickerstrip.state.on);
      return Promise.resolve();
    }));
  });
});
