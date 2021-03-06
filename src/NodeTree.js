'use strict';

function NodeTree(entity, father, children) {
    this.entity    = entity   || '';
    this.children  = children || [];

    if (father) father.addChild(this);
    else this.father = '';
  }

  NodeTree.prototype.getFather = function() {
    return this.father;
  };

  NodeTree.prototype.setFather = function(father) {
    if (father instanceof NodeTree) this.father = father;
    else console.log('This is not a node');
  }

  NodeTree.prototype.getEntity = function() {
    return this.entity;
  }

  NodeTree.prototype.setEntity = function(entity) {
    if (entity instanceof Entity) this.entity = entity;
    else console.log('This is not an entity');
  }

  NodeTree.prototype.index = function() {
    if (!this.isRoot()) return this.father.children.indexOf(this);
  }

  NodeTree.prototype.isRoot = function() {
    return (this.father == '');
  };

  NodeTree.prototype.childrenNumber = function() {
    return this.children.length;
  };

  NodeTree.prototype.hasSibling = function() {
    return (this.father.existsChild(this.father.getChild(this.index() +1 )));
  }

  NodeTree.prototype.nextSibling = function() {
    return ((!this.isRoot()) && (this.hasSibling())) ? this.father.getChild(this.index() +1) : null;
  };

  NodeTree.prototype.addChild = function(child) {
    child.setFather(this);
    this.children.push(child);
  };

  NodeTree.prototype.newChild = function() {
    return this.addChild(new NodeTree('', this, []));
  };

  NodeTree.prototype.getChild = function(index) {
    return (this.existsChild(this.children[index])) ? this.children[index] : null;
  };

  NodeTree.prototype.firstChild = function() {
    return this.getChild(0);
  };

  NodeTree.prototype.lastChild = function() {
    return this.getChild(this.childrenNumber() -1);
  };

  NodeTree.prototype.removeChild = function(child) {
    (this.existsChild(child)) ? this.children.splice(this.index(), 1) : false;
  };

  NodeTree.prototype.removeChildren = function() {
    this.children = [];
  };

  NodeTree.prototype.delete = function() {
    this.father.removeChild(this);
  };

  NodeTree.prototype.existsChild = function(child) {
    return (this.children.indexOf(child) != -1);
  };

  NodeTree.prototype.getChildren = function() {
    return this.children;
  };

  NodeTree.prototype.draw = function(transforms) {
    this.getEntity().beginDraw(transforms);
    this.getChildren().forEach(function(child) {
      child.draw(transforms);
    })
    this.getEntity().endDraw(transforms);
  };

  NodeTree.prototype.save = function(aubengine) {
    var node = this;
    if (node.getEntity() instanceof Light) Lights.add(node.getEntity(), node.getFather().getEntity().getPosition());
      else if (node.getEntity() instanceof Camera) Cameras.add(node.getEntity(), node.getFather().getEntity().getPosition());
      else if (node.getEntity() instanceof Mesh) {
        Scene.loadObject(node.getEntity().getFilename(),
                         node.getEntity().getAlias(),
                         node.getEntity().getAttributes(), aubengine);
      };
    node.getChildren().forEach(function(child) {
      child.save(aubengine);
    })
  };
