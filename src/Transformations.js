'use strict'

function Transformation(name, position, size, rotation) {
  this.name = name;
  this.mv = null;
  this.position = position || [0,0,0];
  this.size = size || [1,1,1];
  this.rotation = rotation || {angle: 0, axis: [0,0,0]};  //angle, axis
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

  if (this.size!=null) {
    mat4.scale(this.mv, this.size);
  };

  if (this.rotation!=null) {
			mat4.rotate(this.mv,(this.rotation.angle*Math.PI/180),this.rotation.axis);
  };

  transforms.setMatrixUniforms();
  // this.endDraw();
};

Transformation.prototype.endDraw = function() {
  transforms.pop();
  console.log('end draw ' + this.name)
}
