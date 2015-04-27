'use strict'

function Mesh(filename, alias, texture) {
  this.filename = filename;
  this.alias   = alias;
  this.ambient = null;
  this.diffuse = null;
  this.specular = null;
  this.wireframe = null;
  this.vertices = null;
  this.indices = null;
  this.scalars = null;
  this.texture_coords = null;
  this.texture = texture || null;
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

Mesh.prototype.setSpecularColor = function(r,g,b) {
  this.Kd = Color.rgb2decimal(r,g,b);
};

Mesh.prototype.setColor = function(color, lum) {
  var luminosity = Color.luminance(color, lum);
  this.Kd = Color.hex2rgb(luminosity);
}

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

Mesh.prototype.setSpecular = function(value) {
  this.Ns = value;
};

Mesh.prototype.getAttributes = function() {
  var attributes = {
    "Ni" : this.Ni,
    "Ka" : this.Ka,
    "d"  : this.d,
    "Kd" : this.Kd,
    "illum" : this.illum,
    "Ks" : this.Ks,
    "Ns" : this.Ns,
    "texture": this.texture
  };
  return attributes;
};

Mesh.prototype.defaultCoords = function() {
  return [0.0, 0.0,
					1.0, 0.0,
					1.0, 1.0,
					0.0, 1.0,
					1.0, 0.0,
					1.0, 1.0,
					0.0, 1.0,
					0.0, 0.0,
					0.0, 1.0,
					0.0, 0.0,
					1.0, 0.0,
					1.0, 1.0,
					1.0, 1.0,
					0.0, 1.0,
					0.0, 0.0,
					1.0, 0.0,
					1.0, 0.0,
					1.0, 1.0,
					0.0, 1.0,
					0.0, 0.0,
					0.0, 0.0,
					1.0, 0.0,
					1.0, 1.0,
					0.0, 1.0];
};

Mesh.prototype.draw = function() {
  try{
    var object = Scene.getObject(this.getAlias());
    gl.uniform1i(Program.uWireframe, false);
    if (object.texture_coords) {
      gl.uniform1i(Program.uTextures, true);
    } else {
      gl.uniform1i(Program.uTextures, false);
    }
    gl.uniform3fv(Program.uKa, object.Ka);
    gl.uniform3fv(Program.uKd, object.Kd);
    gl.uniform3fv(Program.uKs, object.Ks);
    gl.uniform1f(Program.uNs, object.Ns);
    gl.uniform1f(Program.d, object.d);
    gl.uniform1i(Program.illum, object.illum);

    gl.enableVertexAttribArray(Program.aVertexPosition);
    gl.disableVertexAttribArray(Program.aVertexNormal);
    gl.disableVertexAttribArray(Program.aVertexColor);

    gl.bindBuffer(gl.ARRAY_BUFFER, object.vbo);
    gl.vertexAttribPointer(Program.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(Program.aVertexPosition);


   if(object.d < 1.0){  //tweaking parameters here
         gl.uniform1f(Program.d, 0.14);
        }

    /* texture */
    if (object.texture_coords) {
      gl.enableVertexAttribArray(Program.aVertexTextureCoords);
      gl.bindBuffer(gl.ARRAY_BUFFER, object.tbo);
      gl.vertexAttribPointer(Program.aVertexTextureCoords, 2, gl.FLOAT, false, 0, 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, object.texture.texture);
      gl.uniform1i(Program.uSampler, 0);

    };

    /* wireframe */
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
      console.error(err.description);
    }
};

Mesh.prototype.beginDraw = function(transforms) {
  this.draw();
}

Mesh.prototype.endDraw = function() {
};
