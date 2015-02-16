'use strict';

var Aubengine, exports;
Aubengine = (function(width, height, canvasId) {

  function Aubengine(width, height, canvasId) {
    this.width     = width;
    this.height    = height;
    this.names     = ['webgl', 'experimental-webgl', 'webkit-3d', 'moz-webgl'];
    this.canvasId  = canvasId;
    this.gl        = null;
    this.buffer    = null;
  }

Aubengine.prototype.startWeb = function() {
    var canvas = document.getElementById(this.canvasId);
    var i = 0;
    while ((this.gl == null) && (i < this.names.length)) {
      try {
        this.gl = canvas.getContext(this.names[i]);
      } catch (e) {
        console.log(e);
      };
      i++;
    }
  };

  Aubengine.prototype.createBuffer = function() {
    this.gl.createBuffer();
  };

  Aubengine.prototype.isStarted = function() {
    if (this.gl == null) {return false;}
    else {return true;}
  };

  Aubengine.prototype.clear = function() {
    if (this.isStarted()) {
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
      this.gl.viewport(0, 0, this.width, this.height);
    }
  },

  Aubengine.prototype.changeColor = function(color) {
    if (this.isStarted()) {
      this.gl.clearColor(color[0], color[1], color[2], color[3]);
      this.clear(this.gl);
    }
  };

  Aubengine.prototype.hex2rgb = function(hex, opacity) {
    hex = hex.replace('#','');
    var r = parseInt(hex.substring(0,2), 16);
    var g = parseInt(hex.substring(2,4), 16);
    var b = parseInt(hex.substring(4,6), 16);
    return [r/255,g/255,b/255,opacity];
  };

  Aubengine.prototype.addShader = function(Shader) {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, Shader.getVertexBuffer());
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(Shader.getVertices()), this.gl.STATIC_DRAW);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);

    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, Shader.getIndexBuffer());
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(Shader.getIndices()), this.gl.STATIC_DRAW);
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
  }

return Aubengine;
})();

exports = module.exports = Aubengine;
