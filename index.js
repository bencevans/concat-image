
var async  = require('async');
var Canvas = require('canvas');
var Image  = Canvas.Image;

function concatImages(options, callback) {

  var images = Array.isArray(options) ? options : options.images;
  var margin = (typeof options.margin === 'number') ? options.margin : 10;

  loadImages(images, function(err, images) {
    if(err) return callback(err);
    var canvas;

    try {
      canvas = draw(images, { margin: margin });
    } catch(e) {
      return callback(e);
    }

    return callback(null, canvas);

  });


};

function concatImagesV(options, callback) {

  var images = Array.isArray(options) ? options : options.images;
  var margin = (typeof options.margin === 'number') ? options.margin : 10;

  loadImages(images, function(err, images) {
    if(err) return callback(err);
    var canvas;

    try {
      canvas = drawV(images, { margin: margin });
    } catch(e) {
      return callback(e);
    }

    return callback(null, canvas);

  });


};


function loadImages(images, callback) {
  async.map(images, function(src, done) {
    var img = new Image();
    img.onload = function() {
      done(null, img);
    }
    img.src = src;
  }, callback);
}

function draw(images, options) {

  var margin = options.margin;

  var totalWidth  = (images.length - 1) * margin;
  var maxHeight   = 0;

  for (var i = 0; i < images.length; i++) {
    totalWidth  += images[i].width;
    maxHeight   = (images[i].height > maxHeight) ? images[i].height : maxHeight;
  };

  var canvas = new Canvas(totalWidth, maxHeight);
  var ctx = canvas.getContext('2d');
  var currentLeftMargin = 0;

  for (var i = 0; i < images.length; i++) {
    currentLeftMargin = (currentLeftMargin === 0) ? currentLeftMargin : currentLeftMargin + margin;
    ctx.drawImage(images[i], currentLeftMargin, 0);
    currentLeftMargin += images[i].width;
  };

  return canvas;

}

function drawV(images, options) {

  var margin = options.margin;

  var totalHeight  = (images.length - 1) * margin;
  var maxWidth  = 0;

  for (var i = 0; i < images.length; i++) {
    totalHeight  += images[i].height;
    maxWidth   = (images[i].width > maxWidth) ? images[i].width : maxWidth;
  };

  var canvas = new Canvas(maxWidth, totalHeight);
  var ctx = canvas.getContext('2d');
  var currentLeftMargin = 0;

  for (var i = 0; i < images.length; i++) {
    currentLeftMargin = (currentLeftMargin === 0) ? currentLeftMargin : currentLeftMargin + margin;
    ctx.drawImage(images[i], 0, currentLeftMargin);
    currentLeftMargin += images[i].height;
  };

  return canvas;

}

module.exports            = concatImages;
module.exports.h		  = concatImages;
module.exports.v		  = concatImagesV;
module.exports.draw       = draw;
module.exports.loadImages = loadImages;
