'use strict';

var Entity, exports;

Entity = (function() {
  function Entity(attributes) {
    this.attributes = attributes;
  }

Entity.prototype.beginDraw = function(attribute) {};
Entity.prototype.endDraw   = function(attribute) {}; //desapila

  return Entity;
})();

exports = module.exports = Entity;
