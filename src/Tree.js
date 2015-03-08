'use strict';

  function Tree() {
    this.root = new NodeTree();
  };

  Tree.prototype.getRoot = function() {
    return this.root;
  };

  Tree.prototype.preorder = function(node, transforms) {
    if (node == null) return;
    if (node.getEntity() instanceof Mesh) node.getEntity().draw(transforms);
    this.preorder(node.firstChild(), transforms);
    this.preorder(node.nextSibling(), transforms);
  };

  Tree.prototype.save = function(node) {
    if (node == null) return;
    if (node.getEntity() instanceof Light) Lights.add(node.getEntity());
    else if (node.getEntity() instanceof Camera) Cameras.add(node.getEntity());
    else if (node.getEntity() instanceof Mesh) {
      Scene.loadObject(node.getEntity().getFilename(),
                       node.getEntity().getAlias(),
                       node.getEntity().getAttributes());
    };
    this.save(node.firstChild());
    this.save(node.nextSibling());
  };

  Tree.prototype.draw = function(transforms) {
    this.preorder(this.getRoot().firstChild(), transforms);
  };

  Tree.prototype.saveEntities = function(aubengine) {
    this.save(this.getRoot().firstChild());
  };
