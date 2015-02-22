'use strict';

var Light, exports;
Light = (function() {
  function Light(ambient, diffuse, spec, color, direction, position, intensity) {
    this.ambient      = ambient   || null;
    this.diffuse      = diffuse   || null;
    this.spec         = spec      || null;
    this.direction    = direction || null;
    this.position     = position  || null;
    this.intensity    = intensity || null;
    this.color        = color     || null;
    this.prototype    = new Entity();
  }

Light.prototype.getColor  = function() {
  return this.color;
};

/* TODO: geters and seters */
  return Light;
})();

exports = module.exports = Light;
