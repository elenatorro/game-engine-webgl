'use strict';

  function Tree() {
    this.root = new NodeTree();
  };

  Tree.prototype.getRoot = function() {
    return this.root;
  };

  Tree.prototype.drawPreorder = function(node) {
    if (node == null) return;
    if (node.getEntity() instanceof Mesh) node.getEntity().beginDraw();
    else if (node.getEntity() instanceof Transformation) node.getEntity().beginDraw();
    this.drawPreorder(node.firstChild());
    this.drawPreorder(node.nextSibling());

    // if (node == null) return;
    // node.getEntity().beginDraw();
    // node.getChildren().forEach(function(child) {
    //   child.getEntity().beginDraw();
    // });
    // node.getEntity().endDraw();
  };

  Tree.prototype.save = function(node, aubengine) {
    if (node == null) return;
    if (node.getEntity() instanceof Light) Lights.add(node.getEntity(), node.getFather().getEntity().getPosition());
    else if (node.getEntity() instanceof Camera) Cameras.add(node.getEntity());
    else if (node.getEntity() instanceof Mesh) {
      Scene.loadObject(node.getEntity().getFilename(),
                       node.getEntity().getAlias(),
                       node.getEntity().getAttributes(), aubengine);
    };
    this.save(node.firstChild(), aubengine);
    this.save(node.nextSibling(), aubengine);
  };

  Tree.prototype.draw = function() {
    this.drawPreorder(this.getRoot().firstChild());
  };

  Tree.prototype.saveEntities = function(draw) {
    this.save(this.getRoot().firstChild(), draw);

  };
