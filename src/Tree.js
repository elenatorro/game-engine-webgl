'use strict';

  function Tree() {
    this.root = new NodeTree();
  };

  Tree.prototype.getRoot = function() {
    return this.root;
  };

  Tree.prototype.drawPreorder = function(node, transforms) {
    if (node == null) return;
    node.getEntity().beginDraw(transforms);
    this.drawPreorder(node.firstChild(),transforms);
    this.drawPreorder(node.nextSibling(),transforms);
    node.getEntity().endDraw(transforms);
  };

  Tree.prototype.save = function(node, aubengine) {
    if (node == null) return;
    if (node.getEntity() instanceof Light) Lights.add(node.getEntity(), node.getFather().getEntity().getPosition());
    else if (node.getEntity() instanceof Camera) Cameras.add(node.getEntity(), node.getFather().getEntity().getPosition());
    else if (node.getEntity() instanceof Mesh) {
      Scene.loadObject(node.getEntity().getFilename(),
                       node.getEntity().getAlias(),
                       node.getEntity().getAttributes(), aubengine);
    };
    this.save(node.firstChild(), aubengine);
    this.save(node.nextSibling(), aubengine);
  };

  Tree.prototype.draw = function(transforms) {
    this.drawPreorder(this.getRoot().firstChild(), transforms);
  };

  Tree.prototype.saveEntities = function(draw) {
    this.save(this.getRoot().firstChild(), draw);

  };
