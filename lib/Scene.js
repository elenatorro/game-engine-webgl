'use strict';

var NodeTree   = require('./NodeTree');
var Tree       = require('./Tree');
var Scene, exports;

Scene = (function() {
  function Scene() {
    this.root = new NodeTree();
    this.tree = new Tree(this.root);
    this.entity = new Entity();
  }


  return Scene;
})();

exports = module.exports = Scene;
