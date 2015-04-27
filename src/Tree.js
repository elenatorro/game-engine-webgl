'use strict';

function Tree() {
  this.root = new NodeTree();
  this.isDraw = false;
};

Tree.prototype.getRoot = function() {
  return this.root;
};

Tree.prototype.setDraw = function(draw) {
  this.isDraw = draw;
};

Tree.prototype.getDraw = function() {
  return this.isDraw;
};

Tree.prototype.draw = function(transforms) {
  this.getRoot().getChildren().forEach(function(child) {
    child.draw(transforms);
  });
};

Tree.prototype.save = function(aubengine) {
  this.getRoot().getChildren().forEach(function(child) {
    child.save(aubengine);
  });
};

Tree.prototype.saveEntities = function(aubengine, callback) {
  var self = this;
  this.save(self.getRoot().firstChild(), aubengine, callback);
};
