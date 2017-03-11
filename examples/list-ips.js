/* eslint-disable no-console */
/**
 A super simple example to turn on the first Flickerstrip found on the network.
 */

const Flickerstrip = require('../');

Flickerstrip.find().then((strips) => {
  strips.forEach((strip) => {
    console.log(strip.ip);
  });
}).catch((err) => {
  console.error(err);
});
