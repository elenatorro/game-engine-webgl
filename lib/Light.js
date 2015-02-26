'use strict';

var Light, exports;
Light = (function() {
  function Light(ambient, diffuse, spec, direction, position, intensity, color) {
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

Light.prototype.setLight = function(ambient, diffuse, spec, direction, position, intensity, color) {
  this.ambient      = ambient  ;
  this.diffuse      = diffuse  ;
  this.spec         = spec     ;
  this.direction    = direction;
  this.position     = position ;
  this.intensity    = intensity;
  this.color        = color    ;
};

Light.prototype.beginDraw = function(children) {
  for(var i=0;i<children.length;i++) {
    children[i].draw();
};

Light.prototype.endDraw   = function() {}; //desapila

/* TODO: geters and seters */
  return Light;
})();

exports = module.exports = Light;
