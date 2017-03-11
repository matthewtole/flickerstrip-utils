/* eslint-disable no-console */
/**
 A super simple example to turn on the first Flickerstrip found on the network.
 */

const Flickerstrip = require('../');

Flickerstrip.findOne()
  .then(strip => strip.turnOn())
  .catch((err) => {
    console.error(err);
  });
