'use strict';
var Aubengine, exports;

/* Dependencies */
var Entity     = require('./Entity')
var NodeTree   = require('./NodeTree');
var Tree       = require('./Tree');
var Aubengine  = require('./Aubengine');
var Shader     = require('./Shader');
var Color      = require('./Color');
var Texture    = require('./Texture');
var Manager    = require('../ResourceManager');

Aubengine = (function(width, height, canvasId, tree, resourceManager) {
  function Aubengine(width, height, canvasId, tree, resourceManager) {
    /* Properties */
    this.width     = width;
    this.height    = height;
    this.names     = ['webgl', 'experimental-webgl', 'webkit-3d', 'moz-webgl'];

    /* WebGL elements*/
    this.gl        = null;
    this.canvasId  = canvasId;

    /* Scene entities */
    this.texture = new Texture();
    this.model   = new Model();
    this.light   = new Light();
    this.color   = new Color();

    /* Scene */
    this.scene   = new Scene();
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

  Aubengine.prototype.enableVertexAttributes = function(shader) {
    shader.setPointer();
    this.gl.enableVertexAttribArray(shader.getPointer());
  }


  Aubengine.prototype.draw = function() {
    /* TODO */
    //1. Iniciar libreria grafica
    //2. Iniciar las luces
    //3. Iniciar el viewport con la libreria grafica
    //4. Iniciar la camara
    //5.
  }

return Aubengine;
})();

exports = module.exports = Aubengine;
