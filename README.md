# concat-image [![Build Status](https://travis-ci.org/bencevans/concat-image.svg?branch=master)](https://travis-ci.org/bencevans/concat-image)

Concatenate images.

### Install

[node-canvas](https://github.com/LearnBoost/node-canvas)'s dependency of Cairo is required.

On Ubuntu 16.04 LTS this can be done by running the following.

    sudo apt install libcairo2-dev libjpeg-dev libgif-dev 

Then install the node module by running the following.

    npm install --save concat-image

## Usage

```js
var concat = require('concat-image');
var fs     = require('fs');

concat({
  images: [
    fs.readFileSync('./1.png')
    fs.readFileSync('./2.png')
    fs.readFileSync('./3.png')
  ],
  margin: 10 // optional, in px, defaults to 10px
}, function(err, canvas) {
  // canvas === https://github.com/LearnBoost/node-canvas
  fs.writeFileSync('./123.png', canvas.toBuffer());
});
```

### Licence

MIT
