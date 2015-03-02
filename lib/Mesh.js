/* Using K3D library for meshes. http://k3d.ivank.net/ */
'use strict';
  function Mesh(gl) {
    this.vertices           = new Float32Array();
    this.normals            = new Float32Array();
    this.vertexCoordinates  = new Float32Array();
    this.verticesAndIndices = new Array();

    this.file           = "";
    this.textures       = new Array();
    this.textureUrl     = new Array();
    this.texturePath    = "";
    this.textureNum     = null;
    this.textureImage   = null;
    this.texture        = null;
    this.color          = new Color('#222222');
  }

  Mesh.prototype.setVertices = function(vertices) {
    this.vertices = vertices;
  };

  Mesh.prototype.setNormals = function(normals) {
    this.normals = normals;
  }

  Mesh.prototype.setVertexCoordinates = function(vertexCoordinates) {
    this.vertexCoordinates = vertexCoordinates;
  };

  Mesh.prototype.setVerticesAndIndices = function(verticesAndIndices) {
    this.verticesAndIndices = verticesAndIndices;
  };

  Mesh.prototype.setMesh = function(dataFile) { //datafile = array
    this.vertices           = dataFile[0];
    this.normals            = dataFile[1];
    this.vertexCoordinates  = dataFile[2];
    this.verticesAndIndices = dataFile[3];
  }

  Mesh.prototype.getMesh = function() {
    return [this.vertices, this.normals, this.vertexCoordinates, this.verticesAndIndices];
  }

  Mesh.prototype.addIndicesVertices = function(model, indices) {
    model.i_verts.forEach(function(element, index) {indices.push(index);})
    return indices;
  };

  Mesh.prototype.startMesh = function(model, modelFiles) {
    this.vertices           = new Float32Array(K3D.edit.unwrap(model.i_verts, model.c_verts, 3));
    this.normals            = new Float32Array(K3D.edit.unwrap(model.i_norms, model.c_norms, 3));
    this.vertexCoordinates  = new Float32Array(K3D.edit.unwrap(model.i_uvt, model.c_uvt, 2));
    this.verticesAndIndices = this.addIndicesVertices(model, new Array());
    var mesh = this.getMesh();
    modelFiles.push(mesh);
  };

  Mesh.prototype.isAnObj  = function(file) {
    return file.indexOf('.obj' >= 0);
  }

  Mesh.prototype.isAModel = function(file, models) {
    return models.indexOf(file >= 0);
  }

  Mesh.prototype.parseModel = function(obj, mesh, models) {
    models.push(mesh.file);
    return K3D.parse.fromOBJ(obj);
  }

  Mesh.prototype.initMesh = function(obj, mesh, models, modelFiles) {
    var model  = null;
    var exists = false;

    if (this.isAnObj(mesh.file)) {
      if (this.isAModel(this.file, models)) {
        model = this.parseModel(obj, mesh, models);
      }

      else {//is not a model
        exists = true;
        var index     = models.indexOf(mesh.file);
        var dataFile  = modelFiles[index];
        this.setMesh(dataFile);
      }
    } //is not an object

    if(model != null && !exists){
      this.startMesh(models, modelFiles)
    }

    else {
      console.log("The model couldn't be created");
    }
  };

  /* Texture Operations */
  Mesh.prototype.urlLoaded = function() {
    return this.textures.indexOf(this.textureUrl >= 0);
  };

  Mesh.prototype.isLoaded = function(texture) {
    return this.textures.indexOf(texture >= 0);
  };

  Mesh.prototype.loadModel = function(file) {
    this.file = file;
    K3D.load(this.file,this.initMesh, this);},
  }

  Mesh.prototype.loadImage = function(gl, mesh) {
    this.textureImg = new Image();
    this.textureImg.src = this.textureUrl;
    this.textureImg.onload = function() {
      mesh.bindImageTexture(gl, mesh.textureImg, mesh.texture);
    }
  };

  Mesh.prototype.loadTexture = function(gl, mesh) {
    if (!this.urlLoaded()) {
      this.texture = gl.createTexture();
      this.loadImage(gl, mesh);
    }
  };

  Mesh.prototype.bindImageTexture  = function(gl, image, texture) {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
    this.saveFiles(image, texture);
  }

  Mesh.prototype.getTextureFromSrc = function(src) {
    var files = src.split("/");
    return files[files.lenght-1];
  }

  Mesh.prototype.saveFiles = function(image, texture) {
    var textureFile = this.getTextureFromSrc(image.src);
    if (this.isLoaded(textureImage)) {
      this.textures.push(textureFile);
      this.textureFiles.push([image, texture, textureFile]);
    }
    this.updateNum();
  }

  Mesh.prototype.updateNum = function() {
    this.textureNum = this.textures.indexOf(this.textureImg.src);
  };
