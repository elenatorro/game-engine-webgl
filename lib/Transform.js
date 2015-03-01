'use strict';

var Matrix = require('./Matrix');

var Transform, exports;
Transform = (function(attributes) {
  function Transform(matrix) {
    this.matrix = matrix || new Matrix();
  }

Transform.prototype.scale = function(gl, x, y, z, matrix) {
  return this.matrix.scale(x, y, z, matrix);
};

Transform.prototype.rotate = function() {
  /* TODO */
};

Transform.prototype.translate = function(light) {
  /* TODO */
};

return Transform;
})();

exports = module.exports = Transform;
