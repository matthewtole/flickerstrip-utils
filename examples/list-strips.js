/* eslint-disable no-console */
/**
 A super simple example to turn on the first Flickerstrip found on the network.
 */

const Flickerstrip = require('../');
const find = require('lodash/find');
const Table = require('cli-table');

const table = new Table({
  head: ['IP', 'Power', 'Pattern'],
  colWidths: [16, 7, 50],
});

function addStripToTable(strip, status) {
  table.push([
    strip.ip,
    !!strip.power,
    find(status.patterns, { id: status.selectedPattern }).name,
  ]);
}

Flickerstrip.find({ timeout: 10 }).then(strips => Promise.all(strips.map(strip =>
  strip.status().then(status => addStripToTable(strip, status))
))).then(() => {
  console.log(table.toString());
}).catch((err) => {
  console.error(err);
});
