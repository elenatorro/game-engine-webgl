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

    pushEntity : function(entity) {
      this.entityMatrix.push(entity);
    },

    popEntity : function() {
      this.entityMatrix.pop();
    },

    inorder   : function() {
      /* TODO */
    },

    postorder : function() {
      /* TODO */
    }
  }

  return Tree;
})();

exports = module.exports = Tree;
