'use strict';
/* Shader */
// -- Object ------------------------------------------------------
var Spider = require('./Spider');
var Shader, exports;
Shader = (function(vertices, indices, index, size, type, norm, stride, offset) {
  function Shader(vertices, indices, index, size, type, norm, stride, offset) {
    this.vertices = vertices;
    this.indices  = indices;
    this.index    = index;
    this.size     = size;
    this.type     = type;
    this.norm     = norm;
    this.stride   = stride;
    this.offset   = offset;
    this.vertexBuffer = Spider.gl.createBuffer();
    this.indexBuffer  = Spider.gl.createBuffer();
  }

Shader.prototype.getVertices = function() {
  return this.vertices;
};

Shader.prototype.getIndices = function() {
  return this.indices;
};

Shader.prototype.getVertexBuffer = function() {
  return this.vertexBuffer;
};

Shader.prototype.getIndexBuffer = function() {
  return this.indexBuffer;
};

Shader.prototype.createVertex = function() {
  var content = 'attribute vec3 aVertexPosition' +
                'void main(void) {' +
                'gl_Position = vec4(aVertexPosition, 1.0);' +
                '}';

  var script = document.createElement('script');
  script.setAttr('type', 'x-shader/x-vertex');
  script.innerHTML = content;
  document.body.appendChild(script);
};

return Shader;
})();

// -- Export ------------------------------------------------------
exports = module.exports = Shader;
