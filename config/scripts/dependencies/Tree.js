var Tree = function();
var Node = function(entity, children) {
  this.entity = entity;
  this.children = children;
  Node.prototype = {
    /*
    This function allows you to visualizate the scene.
    It calls the entity 'beginDraw' and 'endDraw' methods
    */
    draw = function() {
      this.entity.beginDraw();
      this.children.forEach(function(child){ child.draw();});
      this.entity.endDraw();
    }
  }

}

/* Entity */
var Entity = function(attributes) {
  this.attributes  = attributes;
  Entity.prototype = {
    beginDraw = function(attributes) {},
    endDraw   = function(attributes) {}
  }
}

/* Transform */
var Transform = function(attributes, matrix) {
  this.attributes     = attributes;
  this.matrix         = matrix;
  this.prototype      = new Entity();
  Transform.prototype = {
    constructor = Transform,
    identity    = function() {},
    load        = function(matrix) {},
    traspose    = function() {},
    translate   = function(vector) {},
    multiply    = function(matrix) {},
    rotate      = function(vector) {}
  }
}

var Light    = function(attributes, color) {
  this.attributes = attributes;
  this.color      = color;
  this.prototype  = new Entity();
  Light.prototype = {
    constructor = Light,
    getColor    = function() {return this.color;}
  }
}

var Camera   = function(attributes, isPerspective, planes) {
  this.attributes    = attributes;
  this.isPerspective = isPerspective;
  this.planes        = planes;
  this.perspective   = [];
  this.paralel       = [];
  this.prototype     = new Entity();
  Camera.prototype   = {
    constructor    = Camera,
    setPerspective = function(vector) {this.perspective = vector;},
    setParalel     = function(vector) {this.paralel = vector;}
  }
}

var Malla   = function(attributes) {
  this.attributes = attributes;
  this.prototype  = new Entity();
  Malla.prototype = {
    constructor = Malla,
    loadMalla   = function(file) {}
  }
}






/* Como construir el arbol */

/* Jerarquia de clases */
  /* */
