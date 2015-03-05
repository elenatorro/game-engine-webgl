'use strict';

  function Tree() {
    this.root = new NodeTree();
  };

  Tree.prototype.getRoot = function() {
    return this.root;
  };

  Tree.prototype.preorder = function(node) {
    if (node == null) return;
    if (node.getEntity() instanceof Mesh) node.draw();
    this.preorder(node.firstChild());
    this.preorder(node.nextSibling());
  };

  Tree.prototype.save = function(node, scene) {
    if (node == null) return;
    if (node.getEntity() instanceof Light) Lights.add(node.getEntity());
    else if (node.getEntity() instanceof Camera) Cameras.add(node.getEntity());
    else if (node.getEntity() instanceof Mesh) {
      Scene.loadObject(node.getEntity().getFilename(), node.getEntity().getAlias());
    };
    this.save(node.firstChild(), scene);
    this.save(node.nextSibling(),scene);
  };

  Tree.prototype.draw = function() {
    this.preorder(this.getRoot().firstChild());
  };

  Tree.prototype.saveEntities = function() {
    this.save(this.getRoot().firstChild());
  }
