# concat-image [![Build Status](https://travis-ci.org/bencevans/concat-image.svg?branch=master)](https://travis-ci.org/bencevans/concat-image)

Concatenate images.

### Install

[node-canvas](https://github.com/LearnBoost/node-canvas)'s dependency of Cairo is required.

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
