const SsdpClient = require('node-ssdp').Client;
const got = require('got');
const assign = require('lodash/assign');

const URN = 'urn:schemas-upnp-org:device:Basic:1';
const REGEX = /Flickerstrip/i;

class Flickerstrip {
  static findOne() {
    return new Promise((resolve, reject) => {
      const ssdp = new SsdpClient();
      const timer = setTimeout(() => {
        reject(new Error('No Flickerstrip could be found!'));
      }, 10000);
      ssdp.on('response', (headers, statusCode, info) => {
        if (headers.SERVER.match(REGEX)) {
          clearTimeout(timer);
          return resolve(new Flickerstrip({ ip: info.address }));
        }
        return false;
      });
      ssdp.search(URN);
    });
  }

  static find(options) {
    options = assign({ timeout: 10 }, options || {});
    return new Promise((resolve) => {
      const strips = [];
      const ssdp = new SsdpClient();
      setTimeout(() => {
        resolve(strips);
      }, options.timeout * 1000);
      ssdp.on('response', (headers, statusCode, info) => {
        if (headers.SERVER.match(REGEX)) {
          strips.push(new Flickerstrip({ ip: info.address }));
        }
      });
      ssdp.search(URN);
    });
  }

  constructor(options) {
    this.ip = options.ip;
  }

  turnOff() {
    return got(`http://${this.ip}/power/off`);
  }

  turnOn() {
    return got(`http://${this.ip}/power/on`);
  }
}

module.exports = Flickerstrip;
