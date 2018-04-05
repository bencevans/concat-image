#!/usr/bin/env node

const fs = require('fs');
const concat = require('./');
const argv = process.argv;

if (argv.length < 4) {
    console.log(`
Usage: concat-image [input]... [output]

Example:

  Concatenate two images:

  $ concat-image cat1.jpg cat2.jpg bothcats.jpg
`)
    process.exit(1);
}

const outPath = argv[argv.length - 1];
const inputPaths = argv.slice(2, argv.length - 1);

const inputs = inputPaths.map(path => {
    return fs.readFileSync(path);
});

concat({
    images: inputs,
    margin: 10
  }, function(err, canvas) {
    fs.writeFileSync(outPath, canvas.toBuffer());
  });