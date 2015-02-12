'use strict';
/* Tree */
// -- Object ------------------------------------------------------
var NodeTree = require('./NodeTree.js');
var Tree, exports;
Tree = (function(parent) {
  function Tree(parent) {
    this.parent          = parent;
    this.entityMatrix    = [];
  }

  Tree.prototype = {
    preorder  : function(node, doSomething) {
        if (node == null) return;
        doSomething(node);
        this.preorder(node.firstChild(), doSomething);
        this.preorder(node.nextSibling(), doSomething);
    },

    inorder   : function() {

    },

    postorder : function() {

    }
  }

  return Tree;
})();

// -- Export ------------------------------------------------------
exports = module.exports = Tree;
