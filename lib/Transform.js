'use strict';

var Transform, exports;
Transform = (function(attributes) {
  function Transform(attributes, matrix) {
    this.attributes     = attributes;
    this.matrix         = matrix;
    this.prototype      = new Entity();
  }
}

Transform.prototype = {
  constructor : Transform,
  identity    : function() {},
  load        : function(matrix) {},
  traspose    : function() {},
  translate   : function(vector) {},
  multiply    : function(matrix) {},
  rotate      : function(vector) {},
  beginDraw   : function() {
    //pushes current matrix
    //multiplies the transformation matrix by the current matrix
  },

  endDraw     : function() {

  }
}

return Transform;
})();

exports = module.exports = Transform;
