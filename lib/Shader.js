'use strict';

var Aubengine = require('./Aubengine');
var Shader, exports;
Shader = (function(vertices, indices, index, size, type, norm, stride, offset) {
  function Shader(vertices, indices, index, size, type, norm, stride, offset) {
    this.program      = null; //gl.createProgram
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

    this.vertexShader   = document.getElementById('vertexShader');
    this.fragmentShader = document.getElementById('fragmentShader');
  }

  Shader.prototype.setProgram = function(program) {
    this.program = program;
  };

  Shader.prototype.getVertexShader = function() {
    return this.vertexShader.innerHTML;
  };

  Shader.prototype.getFragmentShader = function() {
    return this.fragmentShader.innerHTML;
  };

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


  Shader.prototype.vertexName = function() {
    return "x-shader/x-vertex";
  };

  Shader.prototype.fragmentName = function() {
    return "x-shader/x-fragment";
 };

  Shader.prototype.createShader = function(type) {
    if (type == 'VERTEX') {return gl.createShader(gl.VERTEX_SHADER)};
    else if (type == 'FRAGMENT') {return gl.createShader(gl.FRAGMENT_SHADER)};
    else {console.log('Incorrect shader'); return null};
  };

  Shader.prototype.checkCompilation = function(shader) {
    if (!this.gl.getShaderParameters(shader, this.gl.COMPILE_STATUS)) return false;
  }

  Shader.prototype.addShader = function(type, source, program) {
    var shader = this.createShader(type);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    if (!this.checkCompilation(shader)) return this.gl.getShaderInfoLog(shader);
    this.gl.attachShader(program, shader);
  };

  Shader.prototype.initProgram = function(gl) {
    var program = null;
    if (this.program == null) { //no program yet, it has to read the shaders
      program = this.gl.createProgram();
      this.addShader('VERTEX',   this.getVertexShader());
      this.addShader('FRAGMENT', this.getFragmentShader());
      this.gl.linkProgram(program);
      this.gl.useProgram(program);
      return program;
    } else { //use the current program configuration
      return this.program;
    };
  };

  Shader.prototype.draw = function(gl) { //the beginDraw hardrock function
    //Initiate the program with the shader configuration
      var program = this.initProgram(gl);
      /* TODO */
      //1. Vertex Configuration. Model View matrix.
      //2. Lights Configuration.
      //3. Textures Configuration.
      //4. Camera Configuration
      //5. Bind Buffers

  };

  return Shader;
})();

exports = module.exports = Shader;
