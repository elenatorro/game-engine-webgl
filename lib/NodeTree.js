// -- Object ------------------------------------------------------
var NodeTree, exports;
var Entity = require("./Entity.js");

NodeTree = (function() {
  function NodeTree(entity, father, index, children) {
    this._entity    = entity;
    this._father    = father;
    this._index     = index;
    this._children  = children;
  }

  NodeTree.prototype.father = function() {
    return this._father;
  };

  NodeTree.prototype.isRoot = function() {
      return (this.father==null);
  };

  NodeTree.prototype.childrenNumber = function() {
    return this.children.length;
  };

  NodeTree.prototype.nextSibling = function() {
    return ((!this.isRoot()) && this.father.existsChild(this.index +1)) ? this.father.getChild(this.index +1) : null;
  };

  NodeTree.prototype.addChild = function() {
    this.children[index] = child;
  };

  NodeTree.prototype.newChild = function() {
    return this.addChild(this.childrenNumber(), new NodeTree(entity, this, this.childrenNumber(), []));
  };

  NodeTree.prototype.getChild = function() {
    return (this.existsChild(index)) ? this.children[index] : null;
  };

  NodeTree.prototype.firstChild = function() {
    return this.getChild(0);
  };

  NodeTree.prototype.lastChild = function() {
    return this.getChild(this.childrenNumber() -1);
  };

  NodeTree.prototype.removeChild = function() {
    /* TODO: correr los elementos del array */
    (this.existsChild(index)) ? this.children[index] = null : false;
  };

  NodeTree.prototype.removeChildren = function() {
    this.children = [];
  };

  NodeTree.prototype.delete = function() {
    this.father.removeChild(this.index);
  };

  NodeTree.prototype.existsChild = function() {
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
