'use strict';

var Entity = require('Entity');
var Camera, exports;
Camera = (function() {
  function Camera(attributes, isPerspective, planes) {
    this.attributes    = attributes;
    this.isPerspective = isPerspective;
    this.planes        = planes;
    this.perspective   = [];
    this.paralel       = [];
    this.isActive      = false;
    this.prototype     = new Entity();
  }



Camera.prototype.setPerspective = function(vector) {
  this.perspective = vector;
};

Camera.prototype.setParalel = function(vector) {
  this.paralel = vector;
};

Camera.prototype.activate = function() {
  this.isActive = true;
};

Camera.prototype.desactivate = function() {
  this.isActive = false;
}

Camera.prototype.draw = function(isCamera) {
  if (isCamera == 'CAMERA' && this.isActive) {
    
  }
};

return Camera;
})();

exports = module.exports = Camera;
