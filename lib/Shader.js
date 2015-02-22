'use strict';

var Aubengine = require('./Aubengine');
var Shader, exports;
Shader = (function(vertices, indices, index, size, type, norm, stride, offset) {
  function Shader(vertices, indices, index, size, type, norm, stride, offset) {
    this.vertices     = vertices;
    this.indices      = indices;

    //attributes pointing to the current VBO
    this.index        = index;
    this.size         = size;
    this.type         = type; //FIXED, BYTE, UNSIGNED_BYTE, FLOAT, SHORT, or UNSIGNED_SHORT.
    this.norm         = norm;
    this.stride       = stride;
    this.offset       = offset;
    this.pointer      = null;

    this.vertexBuffer = Aubengine.gl.createBuffer(); //current VBO
    this.indexBuffer  = Aubengine.gl.createBuffer();
  }

Shader.prototype.getVertices = function() {
  return this.vertices;
};

Shader.prototype.getIndices = function() {
  return this.indices;
};

Shader.prototype.setVertices = function(vertices) {
  this.vertices = vertices;
};

Shader.prototype.setIndices = function(indices) {
  this.indices = indices;
};

Shader.prototype.getVertexBuffer = function() {
  return this.vertexBuffer;
};

Shader.prototype.getIndexBuffer = function() {
  return this.indexBuffer;
};

Shader.prototype.setBuffers = function(context) { //context = Aubengine.gl
  context.bindBuffer(context.ARRAY_BUFFER, this.getVertexBuffer());
  context.bufferData(context.ARRAY_BUFFER, new Float32Array(this.getVertices()), context.STATIC_DRAW);
  context.bindBuffer(context.ARRAY_BUFFER, null);

  context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, this.getIndexBuffer());
  context.bufferData(context.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.getIndices()), context.STATIC_DRAW);
  context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, null);
}

Shader.prototype.setPointer = function(context) {
  this.pointer = context.vertexAttribPointer(this.index, this.size, this,type, this.norm, this.stride, this.offset);
}

Shader.prototype.getPointer = function(context) {
  return this.pointer;
}


Shader.prototype.render = function(vertices, indices, context) {
  this.setVertices(vertices);
  this.setIndices(indices);
  this.setBuffers(context);
  //3. Third, we will point a vertex shader attribute to the VBO that we created in the
  //previous step to store vertex coordinates.

  //4. Finally, we will use the IBO to perform the rendering.

}

/* SCRIPTING */
Shader.prototype.setScript = function(type) {
  if (type) this.type = type;
  var content = 'attribute vec3 aVertexPosition' +
                'void main(void) {' +
                'gl_Position = vec4(aVertexPosition, 1.0);' +
                '}';

  var script = document.createElement('script');
  script.setAttr('type', this.type);
  script.innerHTML = content;
  document.body.appendChild(script);
}

Shader.prototype.createVertex = function() {
  this.setScript("x-shader/x-vertex");
};

Shader.prototype.createFragment = function() {
 this.setScript("x-shader/x-fragment");
}

Shader.prototype.vertexTypes = [
  "attribute vec3 aVertexNormal",
	"attribute vec3 aVertexPosition",
	"attribute vec2 aTextureCoord",
	"attribute vec3 aVertexColor",

	"uniform highp mat4 uMVMatrix",
	"uniform highp mat4 uPMatrix",
	"uniform highp mat4 uNMatrix",

	"uniform mediump vec4 uModelColor",
	"uniform mediump vec3 uAmbientColor[lights]", //lights is a parameter (number of lights)
	"uniform mediump vec3 uPointLightingLocation[lights]",
	"uniform mediump vec3 uPointLightingColor[lights]",
	"uniform mediump float uniformPointLightingIntensity[lights]",
	"uniform mediump float uSpecularFactor[lights]",

	"uniform sampler2D uSampler",

	"varying vec3 vColor",
	"varying vec4 mvPosition",
	"varying mediump vec4 transformedNormal",
	"varying vec2 vTextureCoord"
];

return Shader;
})();

exports = module.exports = Shader;
