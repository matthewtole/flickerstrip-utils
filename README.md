# flickerstrip-utils

Tiny, WIP Node.js module for working with a [Flickerstrip](https://hohmbody.com/flickerstrip/)

## Example Usage

You can find more examples in the [examples folder](./examples/).

```js
const Flickerstrip = require('flickerstrip-utils');

Flickerstrip.findOne().then((strip) => {
  return strip.turnOn();
}).catch((err) => {
  console.error(err);
});
```
