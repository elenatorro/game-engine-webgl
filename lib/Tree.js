'use strict';

var Tree, exports;
Tree = (function(root) {
  function Tree(root) {
    this.root            = root;
    this.entityMatrix    = [];
  }

  Tree.prototype = {
    getRoot : function() {
      return this.root;
    },

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

exports = module.exports = Tree;
