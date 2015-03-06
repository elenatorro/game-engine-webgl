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

  //default values
  this.Ni = 1.00000;
  this.Ka = [0.00000,0.00000,0.00000]; //color ambient
  this.d = 1.00000;
  this.Kd = [0.8,0.80842,0.64000]; //color diffuse
  this.illum = 2;
  this.Ks = [0.94944,0.94944,0.94944]; //color specular
  this.Ns = 96.07843;

  this.position = null;
  this.size     = null;
  this.rotation = null;
}

Mesh.prototype.getAlias = function() {
  return this.alias;
};

Mesh.prototype.getFilename = function() {
  return this.filename;
};

Mesh.prototype.getPosition = function() {
  return this.position;
};

Mesh.prototype.setPosition = function(position) {
  this.position = position;
};

Mesh.prototype.getRotation = function() {
  return this.rotation;
};

Mesh.prototype.setRotation = function(rotation) {
  this.rotation = rotation;
};

Mesh.prototype.setSize = function(size) {
  this.size = size;
};

Mesh.prototype.getSize = function() {
  return this.size;
};

Mesh.prototype.getAttributes = function() {
  var attributes = {
    "Ni" : this.Ni,
    "Ka" : this.Ka,
    "d"  : this.d,
    "Kd" : this.Kd,
    "illum" : this.illum,
    "Ks" : this.Ks,
    "Ns" : this.Ns
  };
  return attributes;
};

Mesh.prototype.draw = function(transforms) {
  try{
    console.log(transforms)
    var object = Scene.getObject(this.getAlias());
    transforms.calculateModelView();
    transforms.push();

    //add transformations
    if (this.getPosition()!=null) {
      var mv = transforms.mvMatrix;
      mat4.translate(mv, this.getPosition());
    };

    if (this.getSize()!=null) {
      var mv = transforms.mvMatrix;
      mat4.scale(mv, this.getSize());
    };

    if (this.getRotation()!=null) {
      
    };

    transforms.setMatrixUniforms();
    transforms.pop();
          gl.enableVertexAttribArray(Program.aVertexPosition);
          gl.disableVertexAttribArray(Program.aVertexNormal);
          gl.disableVertexAttribArray(Program.aVertexColor);

          gl.uniform1i(Program.uWireframe, false);
          gl.uniform3fv(Program.uKa, object.Ka);
          gl.uniform3fv(Program.uKd, object.Kd);
          gl.uniform3fv(Program.uKs, object.Ks);
          gl.uniform1f(Program.uNs, object.Ns);
          gl.uniform1f(Program.d, object.d);
          gl.uniform1i(Program.illum, object.illum);

         if(object.d < 1.0){  //tweaking parameters here
               gl.uniform1f(Program.d, 0.14);
              }


          gl.bindBuffer(gl.ARRAY_BUFFER, object.vbo);
          gl.vertexAttribPointer(Program.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
          gl.enableVertexAttribArray(Program.aVertexPosition);

    if(!object.wireframe){
      gl.bindBuffer(gl.ARRAY_BUFFER, object.nbo);
      gl.vertexAttribPointer(Program.aVertexNormal, 3, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(Program.aVertexNormal);
          }
          else{
              gl.uniform1i(Program.uWireframe, true);
          }

          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, object.ibo);

    if (object.wireframe){
              gl.drawElements(gl.LINES, object.indices.length, gl.UNSIGNED_SHORT,0);
          }
          else{
              gl.drawElements(gl.TRIANGLES, object.indices.length, gl.UNSIGNED_SHORT,0);
          }

          gl.bindBuffer(gl.ARRAY_BUFFER, null);
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

  }
  catch(err){
      alert(err);
      console.error(err.description);
    }
};
