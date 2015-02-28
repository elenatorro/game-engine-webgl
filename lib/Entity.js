'use strict';

var Entity, exports;

Entity = (function() {
  function Entity(elements, files) {
    this.elements = elements || [];
    this.files    = files    || [];
  }

Entity.prototype.beginDraw = function(children) {
  children.forEach(function(child) {
    child.draw();
  })
};

Entity.prototype.endDraw   = function() {};

  return Entity;
})();

exports = module.exports = Entity;
