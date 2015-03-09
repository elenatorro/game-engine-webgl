'use strict'

function Transformation(name, position, size, rotation) {
  this.name = name;
  this.mv = null;
  this.position = position || [0,0,0];
  this.size = size || [1,1,1];
};

Transformation.prototype.getPosition = function() {
  return this.position;
}

Transformation.prototype.beginDraw = function() {
  transforms.calculateModelView(); //calcula la matriz actual
  transforms.push(); //apila
  this.mv = transforms.mvMatrix; //hace una copia
  //TODO add rotation
  if (this.position!=null) {
    mat4.translate(this.mv, this.position);
  };

  if (this.size=null) {
    mat4.scale(this.mv, this.size);
  };

  transforms.setMatrixUniforms();
  this.endDraw();
};

Transformation.prototype.endDraw = function() {
  transforms.pop();
}
