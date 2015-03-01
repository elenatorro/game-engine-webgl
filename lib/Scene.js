'use strict';

var NodeTree     = require('./NodeTree');
var Tree         = require('./Tree');
var Shader       = require('./Shader');
var Scene, exports;

Scene = (function() {
  function Scene(gl, program) {
    this.root    = new NodeTree();
    this.tree    = new Tree(this.root);
    this.matrix  = new Array();
    this.gl      = gl;
    this.shader  = new Shader();
  }

  Scene.prototype.setGl = function(gl) {
    this.gl = gl;
  };

  Scene.prototype.getLastMatrix = function() {
    	if (this.matrix.length>0) return this.matrix[this.matrix.length-1];
    	else return null;
  };

  Scene.prototype.getMatrix = function() {
    return this.matrix;
  };

  Scene.prototype.getRoot = function() {
    return this.root;
  };

  Scene.prototype.getTree = function() {
    return this.tree;
  };

  return Scene;
})();

exports = module.exports = Scene;
