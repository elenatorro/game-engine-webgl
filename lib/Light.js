'use strict';
/* Light */
// -- Object ------------------------------------------------------
var Light, exports;
Light = (function() {
  function Light(attributes, color) {
    this.attributes = attributes;
    this.color      = color;
    this.prototype  = new Entity();
  }

Light.prototype.getColor  = function() {
  return this.color;
};

  return Light;
})();

// -- Export ------------------------------------------------------
exports = module.exports = Light;
