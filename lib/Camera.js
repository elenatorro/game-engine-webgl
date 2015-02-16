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
    this.prototype     = new Entity();
  }

  

Camera.prototype.setPerspective = function(vector) {
  this.perspective = vector;
};

Camera.prototype.setParalel = function(vector) {
  this.paralel = vector;
};

return Camera;
})();

exports = module.exports = Camera;
