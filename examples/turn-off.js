/* eslint-disable no-console */
/**
 A super simple example to turn off the first Flickerstrip found on the network.
 */

const Flickerstrip = require('../');

Flickerstrip.findOne()
  .then(strip => strip.turnOff())
  .catch((err) => {
    console.error(err);
  });
