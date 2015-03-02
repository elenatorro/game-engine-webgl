'use strict';

/* Dependencies */

function Aubengine(width, height, canvasId) {
    /* Properties */
    this.width     = width;
    this.height    = height;
    this.names     = ['webgl', 'experimental-webgl', 'webkit-3d', 'moz-webgl'];
    this.canvasId  = canvasId;

    /* WebGL elements*/
    this.gl        = null;

    /* Entities */
    this.mesh      = new Mesh();
    this.light     = new Light();
    this.color     = new Color();
    this.transform = new Transform();
    this.shader    = new Shader(this.gl);

    /* Scene */
    this.scene   = new Scene(this.gl, this.program); //has the scene tree and the model view matrix

    /* Resource Manager */
    this.content = new ShadersContent();
    this.vertexShaderContent   = this.content.vertexContent;
    this.fragmentShaderContent = this.content.fragmentContent;
}

  Aubengine.prototype.setVertexShaderContent = function(content) {
    this.vertexShaderContent = content;
  };

  Aubengine.prototype.getManager = function() {
    return this.manager;
  }
  /* Basic previous configuration */
  Aubengine.prototype.getGl = function() {
    return this.gl;
  };

  Aubengine.prototype.setGl = function(gl) {
    this.gl = gl;
    this.scene.setGl(gl);
  };

  Aubengine.prototype.setProgram = function(program) {
    this.program = program;
    this.scene.setProgram(program);
  };

  Aubengine.prototype.setShaders = function(content, type) {
       var script = document.createElement('script');
       script.setAttribute('type', type);
       script.innerHTML = content;
       document.body.appendChild(script);
  }

  Aubengine.prototype.startWeb = function() {
    var canvas = document.getElementById(this.canvasId);
    var i = 0;
    this.gl = canvas.getContext('webgl');
    this.setShaders(this.vertexShaderContent,   this.shader.vertexName());
    this.setShaders(this.fragmentShaderContent, this.shader.fragmentName());

    this.setUpGl();
    this.setUpScene();
    this.draw();
  };

  Aubengine.prototype.setUpGl = function() {
    this.changeColor(0,0,0,1.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    this.gl.depthFunc(this.gl.LEQUAL);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
  };

  Aubengine.prototype.draw = function() {
    this.scene.getRoot.draw();
  };

  Aubengine.prototype.setUpScene = function() {
    var modelview = mat4.create();
    mat4.identity(modelview);
    this.scene.modelView.push(modelView);
    this.scene.createSceneTree();
  };

  Aubengine.prototype.createBuffer = function() {
    this.gl.createBuffer();
  };

  Aubengine.prototype.isStarted = function() {
    if (this.gl == null) {return false;}
    else {return true;}
  };

/* Main functions, the real magic */
  Aubengine.prototype.clear = function() {
    if (this.isStarted()) {
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
      this.gl.viewport(0, 0, this.width, this.height);
    }
  };

  Aubengine.prototype.changeColor = function(color) {
    if (this.isStarted()) {
      this.gl.clearColor(color[0], color[1], color[2], color[3]);
      this.clear(this.gl);
    };
  };

  Aubengine.prototype.scale = function(gl, x, y, z, matrix) {
    this.transform.scale(gl, x, y, z, matrix);
  };

  /* TODO */
  //all the façade methods for transformations and lights and cameras
