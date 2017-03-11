const SsdpClient = require('node-ssdp').Client;
const got = require('got');

class Flickerstrip {
  static findOne() {
    return new Promise((resolve, reject) => {
      const ssdp = new SsdpClient();
      const timer = setTimeout(() => {
        reject(new Error('No Flickerstrip could be found!'));
      }, 10000);
      ssdp.on('response', (headers, statusCode, info) => {
        if (headers.SERVER.match(/Flickerstrip/i)) {
          clearTimeout(timer);
          return resolve(new Flickerstrip({ ip: info.address }));
        }
        return false;
      });
      ssdp.search('urn:schemas-upnp-org:device:Basic:1');
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
