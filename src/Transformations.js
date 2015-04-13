'use strict'

function Transformation(name, position, size, rotation) {
  this.name = name;
  this.mv = null;
  this.position = position || [0,0,0];
  this.size = size || [1,1,1];
  this.rotation = rotation || {angle: 0, axis: [0,0,0]};  //angle, axis
  this.animations = [];
};

Transformation.prototype.getPosition = function() {
  return this.position;
};

Transformation.prototype.startAnimation = function() {
  this.animations.forEach(function(animation) {
    animation.startAnimation();
  })
};

Transformation.prototype.copy = function() {
  var self = this;
  var newTransformation = new Transformation(self.name, self.position, self.size, self.rotation);
  return newTransformation;
};

Transformation.prototype.beginDraw = function() {
  transforms.push(); //apila
  transforms.calculateModelView(); //calcula la matriz actual
  this.mv = transforms.mvMatrix; //hace una copia

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
  console.log('begin draw ' + this.name);
};

Transformation.prototype.endDraw = function() {
  transforms.pop(); //la desapila y la pone como mvMatrix
  console.log('end draw ' + this.name)
}

/* ANIMACION */
Transformation.prototype.rotate = function(rotations) {
  rotations[0].angle = rotations[1].angle + rotations[0].angle;
};

Transformation.prototype.translate = function(positions) {
  vec3.add(positions[0], positions[1], positions[0]);
};


Transformation.prototype.scale = function(size) {
  this.size = size;
  return this;
};

Transformation.prototype.animate = function(frequency, scene, times, callback, data) {
  this.animations.push(new Animation(frequency, scene, times, callback, data));
};
