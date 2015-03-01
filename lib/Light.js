'use strict';

var Entity = require('./Entity');
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

/* TODO: getters and setters */
  Light.prototype.setAmbient   = function(ambient){
    this.ambbient = ambient;
  };

  Light.prototype.setDiffuse   = function(diffuse){
    this.ambbient = diffuse;
  };

  Light.prototype.setSpec      = function(spec){
    this.ambbient = spec;
  };

  Light.prototype.setDirection = function(direction){
    this.ambbient = direction;
  };

  Light.prototype.setPosition  = function(position){
    this.ambbient = position;
  };

  Light.prototype.setIntensity = function(intensity){
    this.ambbient = intensity;
  };

  Light.prototype.setColor     = function(color){
    this.ambbient = color;
  };


  return Light;
})();

exports = module.exports = Light;
