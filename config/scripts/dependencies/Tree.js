var Tree = function(parent) {
  this.parent          = parent;
  this.entityMatrix    = [];
};

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

var Node = function(entity, father, index, children) {
  this.entity    = entity;
  this.father    = father;
  this.index     = index;
  this.children  = children;
}

Node.prototype = {
  father         : function() {
    return this.father;},

  isFather       : function() {
    return (this.father==null)
  },

  childrenNumber : function() {
    return this.children.length;},

  nextSibling    : function() {
    return ((!this.isFather()) && this.father.existsChild(this.index +1)) ? this.father.getChild(this.index +1) : null;},

  addChild       : function(index, child) {
    this.children[index] = child;},

  newChild       : function(entity) {
    return this.addChild(this.childrenNumber(), new Node(entity, this, this.childrenNumber(), []));},

  getChild       : function(index) {
    return (this.existsChild(index)) ? this.children[index] : null;},

  firstChild     : function() {
    return this.getChild(0);},

  lastChild      : function() {
    return this.getChild(this.childrenNumber() -1);},

  removeChild    : function(index) {
    (this.existsChild(index)) ? this.children[index] = null : false;},

  removeChildren : function(index) {
    this.children = [];},

  delete         : function() {
    this.father.removeChild(this.index);},

  existsChild     : function(index) {
    return (this.children[index] != null)},

  /*
  This function allows you to visualize the scene.
  It calls the entity 'beginDraw' and 'endDraw' methods
  */
  draw : function() {
    this.entity.beginDraw();
    this.children.forEach(function(child){ child.draw();});
    this.entity.endDraw();
  }
}

/* Entity */
var Entity = function(attributes) {
  this.attributes  = attributes;
}

Entity.prototype = {
  beginDraw : function(attributes) {}, //go down to the next level
  endDraw   : function(attributes) {}  //go up to the previous level
}

/* Transform */
var Transform = function(attributes, matrix) {
  this.attributes     = attributes;
  this.matrix         = matrix;
  this.prototype      = new Entity();
}

Transform.prototype = {
  constructor : Transform,
  identity    : function() {},
  load        : function(matrix) {},
  traspose    : function() {},
  translate   : function(vector) {},
  multiply    : function(matrix) {},
  rotate      : function(vector) {},
  beginDraw   : function() {
    //pushes current matrix
    //multiplies the transformation matrix by the current matrix
  },

  endDraw     : function() {
    //pops transformation matrix, which becames the current matrix
  }
}

var Light    = function(attributes, color) {
  this.attributes = attributes;
  this.color      = color;
  this.prototype  = new Entity();
}

Light.prototype = {
  constructor : Light,
  getColor    : function() {return this.color;}
}

var Camera   = function(attributes, isPerspective, planes) {
  this.attributes    = attributes;
  this.isPerspective = isPerspective;
  this.planes        = planes;
  this.perspective   = [];
  this.paralel       = [];
  this.prototype     = new Entity();
}

Camera.prototype   = {
  constructor    : Camera,
  setPerspective : function(vector) {this.perspective = vector;},
  setParalel     : function(vector) {this.paralel = vector;}
}

var Mesh   = function(attributes) {
  this.attributes = attributes;
  this.prototype  = new Entity();
}

Mesh.prototype = {
  constructor : Mesh,
  loadMesh    : function(file) {}
}
