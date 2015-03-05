'use strict'

function Mesh(filename, alias) {
  this.filename = filename;
  this.alias   = alias;
  this.ambient = null;
  this.diffuse = null;
  this.specular = null;
  this.wireframe = null;
  this.vertices = null;
  this.indices = null;
  this.scalars = null;
  this.textureCoords = null;
  this.texture = null;
  this.image = null;
  this.tbo = null;
  this.cbo = null;
  this.nbo = null;
  this.ibo = null;
  this.vbo = null;
  this.remote = null;
  this.Ni = null;
  this.Ka = null;
  this.d = null;
  this.Kd = null;
  this.illum = null;
  this.Ks = null;
  this.Ns = null;
}

Mesh.prototype.getAlias = function() {
  return this.alias;
};

Mesh.prototype.getFilename = function() {
  return this.filename;
};

Mesh.prototype.draw = function() {
  console.log('mesh faking drawing');
};
