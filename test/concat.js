
var assert   = require('assert');
var fs = require('fs');
var crypto = require('crypto');
var concatImages = require('../');


describe('concat', function() {

  it('should concat', function(done) {

    concatImages([
      fs.readFileSync(__dirname + '/images/travis.png'),
      fs.readFileSync(__dirname + '/images/david.png')
    ], function(err, canvas) {
      assert.ifError(err);

      var sum = crypto.createHash('md5');
      sum.update(canvas.toBuffer());
      assert(sum.digest().toString('hex') === 'bd9291ec4d6237e2e2d4c62aa396d8c4');
      done();
    });

  });

});
