'use strict';
// -- Object ------------------------------------------------------
var NodeTree, exports;

NodeTree = (function() {
  function NodeTree(entity, father, index, children) {
    this.entity    = entity || '';
    this.father    = father || '';
    this.index     = index  || 0;
    this.children  = children || [];
  }

  NodeTree.prototype.getFather = function() {
    return this.father;
  };

  NodeTree.prototype.isRoot = function() {
    return (this.father == '');
  };

  NodeTree.prototype.childrenNumber = function() {
    return this.children.length;
  };

  NodeTree.prototype.nextSibling = function() {
    return ((!this.isRoot()) && (this.father.existsChild(this.index +1))) ? this.father.getChild(this.index +1) : null;
  };

  NodeTree.prototype.addChild = function(index, child) {
    this.children[index] = child;
  };

  NodeTree.prototype.newChild = function() {
    return this.addChild(this.childrenNumber(), new NodeTree('', this, this.childrenNumber(), []));
  };

  NodeTree.prototype.getChild = function(index) {
    return (this.existsChild(index)) ? this.children[index] : null;
  };

  NodeTree.prototype.firstChild = function() {
    return this.getChild(0);
  };

  NodeTree.prototype.lastChild = function() {
    return this.getChild(this.childrenNumber() -1);
  };

  NodeTree.prototype.removeChild = function(index) {
    /* TODO: correr los elementos del array */
    (this.existsChild(index)) ? this.children[index] = null : false;
  };

  NodeTree.prototype.removeChildren = function() {
    this.children = [];
  };

  NodeTree.prototype.delete = function() {
    this.father.removeChild(this.index);
  };

  NodeTree.prototype.existsChild = function(index) {
    return (this.children[index] != null);
  };

  NodeTree.prototype.draw = function() {
    this.entity.beginDraw();
    this.children.forEach(function(child){ child.draw();});
    this.entity.endDraw();
  };

  return NodeTree;
})();

// -- Export ------------------------------------------------------
exports = module.exports = NodeTree;
