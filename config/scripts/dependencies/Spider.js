var Shader = function(vertices, indices, index, size, type, norm, stride, offset) {
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
}

Shader.prototype.getIndices = function() {
  return this.indices;
}

Shader.prototype.getVertexBuffer = function() {
  return this.vertexBuffer;
}

Shader.prototype.getIndexBuffer = function() {
  return this.indexBuffer;
}

Shader.prototype.createVertex = function() {
  var content = 'attribute vec3 aVertexPosition' +
                'void main(void) {' +
                'gl_Position = vec4(aVertexPosition, 1.0);' +
                '}';

  var script = document.createElement('script');
  script.setAttr('type', 'x-shader/x-vertex');
  script.innerHTML = content;
  document.body.appendChild(script);
}

var Spider = {
  //__privated variables
  gl      : null,
  width   : 800,
  height  : 800,
  names : ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"],
  buffer  : Spider.gl.createBuffer(),

  //__functions
  startWeb: function(canvasId, width, height) {
    var canvas = document.getElementById(canvasId);
    Spider.width = width;
    Spider.height = height;
    var i = 0;
    // Spider.gl = canvas.getContext('webgl');
    while ((Spider.gl == null) && (i < Spider.names.length)) {
      try {
          Spider.gl = canvas.getContext(Spider.names[i]);
        } catch (e) {
          console.log(e)
        };
        i++;
    }
  },

  isStarted: function() {
    if (Spider.gl == null) return false;
    else return true;
  },

  clear: function() {
    if (Spider.isStarted()) {
      Spider.gl.clear(Spider.gl.COLOR_BUFFER_BIT);
      Spider.gl.viewport(0, 0, Spider.width, Spider.height);
    }
  },

  changeColor: function(color) {
    if (Spider.isStarted()) {
      Spider.gl.clearColor(color[0], color[1], color[2], color[3]);
      Spider.clear(Spider.gl);
    }
  },

  hex2rgb: function(hex, opacity) {
      hex = hex.replace('#','');
      r = parseInt(hex.substring(0,2), 16);
      g = parseInt(hex.substring(2,4), 16);
      b = parseInt(hex.substring(4,6), 16);
      return [r/255,g/255,b/255,opacity];
    },

  addShader: function(Shader) {
    Spider.gl.bindBuffer(Spider.gl.ARRAY_BUFFER, Shader.getVertexBuffer());
    Spider.gl.bufferData(Spider.gl.ARRAY_BUFFER, new Float32Array(Shader.getVertices()), Spider.gl.STATIC_DRAW);
    Spider.gl.bindBuffer(Spider.gl.ARRAY_BUFFER, null);

    Spider.gl.bindBuffer(Spider.gl.ELEMENT_ARRAY_BUFFER, Shader.getIndexBuffer());
    Spider.gl.bufferData(Spider.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(Shader.getIndices()), gl.STATIC_DRAW);
    Spider.gl.bindBuffer(Spider.gl.ELEMENT_ARRAY_BUFFER, null);
  }
};
