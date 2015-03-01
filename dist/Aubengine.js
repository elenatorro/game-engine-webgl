(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Color, exports;

Color = (function() {
  function Color(hex) {
    this.hex  = hex || '#FFFFFF';
    this.rgba = this.hex2rgb(this.hex, 1);
    this.vec  = null;
  }

  Color.prototype.hex2rgb = function(hex, opacity) {
    var hexStr = hex.replace('#','');
    var r = parseInt(hexStr.substring(0,2), 16);
    var g = parseInt(hexStr.substring(2,4), 16);
    var b = parseInt(hexStr.substring(4,6), 16);
    return [r/255,g/255,b/255,opacity];
  };

  Color.prototype.rgb2hex = function(rgb) {
   return "#" +
    ("0" + parseInt(rgb[0],10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[2],10).toString(16)).slice(-2);
  }

  Color.prototype.setColorRgba = function(r,g,b,a) {
    this.rgba     = [r,g,b, a || 1];
    this.hex      = this.rgb2hex(this.rgba);
    this.vec      = vec4(r,g,b,a);
  }

  Color.prototype.setColorHex = function(hex, opacity) {
    this.hex      = hex;
    this.rgba     = this.rgba(hex, opacity || 1);
    this.vec      = vec4(this.rgba[0],this.rgba[1],this.rgba[2],this.rgba[3]);
  }

  Color.prototype.getHex  = function() {
    return this.hex;
  };

  Color.prototype.getRgba = function() {
    return this.rgba;
  };

  Color.prototype.getVec  = function() {
    return this.vec;
  };

  return Color;
})();

exports = module.exports = Color;

},{}],2:[function(require,module,exports){
'use strict';

var Entity, exports;

Entity = (function() {
  function Entity(elements, files) {
    this.elements = elements || [];
    this.files    = files    || [];
  }

Entity.prototype.beginDraw = function(children) {
  children.forEach(function(child) {
    child.draw();
  })
};

Entity.prototype.endDraw   = function() {};

  return Entity;
})();

exports = module.exports = Entity;

},{}],3:[function(require,module,exports){
'use strict';

var Entity = require('./Entity');
var Light, exports;
Light = (function() {
  function Light(ambient, diffuse, spec, direction, position, intensity, color) {
    this.ambient      = ambient   || null;
    this.diffuse      = diffuse   || null;
    this.spec         = spec      || null;
    this.direction    = direction || null;
    this.position     = position  || null;
    this.intensity    = intensity || null;
    this.color        = color     || null;
    this.prototype    = new Entity();
  }

  Light.prototype.getColor  = function() {
    return this.color;
  };

  Light.prototype.setLight = function(ambient, diffuse, spec, direction, position, intensity, color) {
    this.ambient      = ambient  ;
    this.diffuse      = diffuse  ;
    this.spec         = spec     ;
    this.direction    = direction;
    this.position     = position ;
    this.intensity    = intensity;
    this.color        = color    ;
  };

/* TODO: getters and setters */
  Light.prototype.setAmbient   = function(ambient){
    this.ambbient = ambient;
  };

  Light.prototype.setDiffuse   = function(diffuse){
    this.ambbient = diffuse;
  };

  Light.prototype.setSpec      = function(spec){
    this.ambbient = spec;
  };

  Light.prototype.setDirection = function(direction){
    this.ambbient = direction;
  };

  Light.prototype.setPosition  = function(position){
    this.ambbient = position;
  };

  Light.prototype.setIntensity = function(intensity){
    this.ambbient = intensity;
  };

  Light.prototype.setColor     = function(color){
    this.ambbient = color;
  };


  return Light;
})();

exports = module.exports = Light;

},{"./Entity":2}],4:[function(require,module,exports){
/**
@author https://github.com/evanw
@github https://github.com/evanw/lightgl.js/blob/master/src/matrix.js
*/
'use strict';

var Matrix, exports;
Matrix = (function() {
  var hasFloat32Array = (typeof Float32Array != 'undefined');

  function Matrix() {
    var m = Array.prototype.concat.apply([], arguments);
    if (!m.length) {
      m = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
      ];
    }
    this.m = hasFloat32Array ? new Float32Array(m) : m;
  }

  Matrix.prototype = {
    inverse: function() {
      return Matrix.inverse(this, new Matrix());
    },

    transpose: function() {
      return Matrix.transpose(this, new Matrix());
    },

    multiply: function(matrix) {
      return Matrix.multiply(this, matrix, new Matrix());
    },

    transformPoint: function(v) {
      var m = this.m;
      return new Vector(
        m[0] * v.x + m[1] * v.y + m[2] * v.z + m[3],
        m[4] * v.x + m[5] * v.y + m[6] * v.z + m[7],
        m[8] * v.x + m[9] * v.y + m[10] * v.z + m[11]
      ).divide(m[12] * v.x + m[13] * v.y + m[14] * v.z + m[15]);
    },

    transformVector: function(v) {
      var m = this.m;
      return new Vector(
        m[0] * v.x + m[1] * v.y + m[2] * v.z,
        m[4] * v.x + m[5] * v.y + m[6] * v.z,
        m[8] * v.x + m[9] * v.y + m[10] * v.z
      );
    }
  };

  Matrix.inverse = function(matrix, result) {
    result = result || new Matrix();
    var m = matrix.m, r = result.m;

    r[0] = m[5]*m[10]*m[15] - m[5]*m[14]*m[11] - m[6]*m[9]*m[15] + m[6]*m[13]*m[11] + m[7]*m[9]*m[14] - m[7]*m[13]*m[10];
    r[1] = -m[1]*m[10]*m[15] + m[1]*m[14]*m[11] + m[2]*m[9]*m[15] - m[2]*m[13]*m[11] - m[3]*m[9]*m[14] + m[3]*m[13]*m[10];
    r[2] = m[1]*m[6]*m[15] - m[1]*m[14]*m[7] - m[2]*m[5]*m[15] + m[2]*m[13]*m[7] + m[3]*m[5]*m[14] - m[3]*m[13]*m[6];
    r[3] = -m[1]*m[6]*m[11] + m[1]*m[10]*m[7] + m[2]*m[5]*m[11] - m[2]*m[9]*m[7] - m[3]*m[5]*m[10] + m[3]*m[9]*m[6];

    r[4] = -m[4]*m[10]*m[15] + m[4]*m[14]*m[11] + m[6]*m[8]*m[15] - m[6]*m[12]*m[11] - m[7]*m[8]*m[14] + m[7]*m[12]*m[10];
    r[5] = m[0]*m[10]*m[15] - m[0]*m[14]*m[11] - m[2]*m[8]*m[15] + m[2]*m[12]*m[11] + m[3]*m[8]*m[14] - m[3]*m[12]*m[10];
    r[6] = -m[0]*m[6]*m[15] + m[0]*m[14]*m[7] + m[2]*m[4]*m[15] - m[2]*m[12]*m[7] - m[3]*m[4]*m[14] + m[3]*m[12]*m[6];
    r[7] = m[0]*m[6]*m[11] - m[0]*m[10]*m[7] - m[2]*m[4]*m[11] + m[2]*m[8]*m[7] + m[3]*m[4]*m[10] - m[3]*m[8]*m[6];

    r[8] = m[4]*m[9]*m[15] - m[4]*m[13]*m[11] - m[5]*m[8]*m[15] + m[5]*m[12]*m[11] + m[7]*m[8]*m[13] - m[7]*m[12]*m[9];
    r[9] = -m[0]*m[9]*m[15] + m[0]*m[13]*m[11] + m[1]*m[8]*m[15] - m[1]*m[12]*m[11] - m[3]*m[8]*m[13] + m[3]*m[12]*m[9];
    r[10] = m[0]*m[5]*m[15] - m[0]*m[13]*m[7] - m[1]*m[4]*m[15] + m[1]*m[12]*m[7] + m[3]*m[4]*m[13] - m[3]*m[12]*m[5];
    r[11] = -m[0]*m[5]*m[11] + m[0]*m[9]*m[7] + m[1]*m[4]*m[11] - m[1]*m[8]*m[7] - m[3]*m[4]*m[9] + m[3]*m[8]*m[5];

    r[12] = -m[4]*m[9]*m[14] + m[4]*m[13]*m[10] + m[5]*m[8]*m[14] - m[5]*m[12]*m[10] - m[6]*m[8]*m[13] + m[6]*m[12]*m[9];
    r[13] = m[0]*m[9]*m[14] - m[0]*m[13]*m[10] - m[1]*m[8]*m[14] + m[1]*m[12]*m[10] + m[2]*m[8]*m[13] - m[2]*m[12]*m[9];
    r[14] = -m[0]*m[5]*m[14] + m[0]*m[13]*m[6] + m[1]*m[4]*m[14] - m[1]*m[12]*m[6] - m[2]*m[4]*m[13] + m[2]*m[12]*m[5];
    r[15] = m[0]*m[5]*m[10] - m[0]*m[9]*m[6] - m[1]*m[4]*m[10] + m[1]*m[8]*m[6] + m[2]*m[4]*m[9] - m[2]*m[8]*m[5];

    var det = m[0]*r[0] + m[1]*r[4] + m[2]*r[8] + m[3]*r[12];
    for (var i = 0; i < 16; i++) r[i] /= det;
    return result;
  };

  Matrix.transpose = function(matrix, result) {
    result = result || new Matrix();
    var m = matrix.m, r = result.m;
    r[0] = m[0]; r[1] = m[4]; r[2] = m[8]; r[3] = m[12];
    r[4] = m[1]; r[5] = m[5]; r[6] = m[9]; r[7] = m[13];
    r[8] = m[2]; r[9] = m[6]; r[10] = m[10]; r[11] = m[14];
    r[12] = m[3]; r[13] = m[7]; r[14] = m[11]; r[15] = m[15];
    return result;
  };

  Matrix.multiply = function(left, right, result) {
    result = result || new Matrix();
    var a = left.m, b = right.m, r = result.m;

    r[0] = a[0] * b[0] + a[1] * b[4] + a[2] * b[8] + a[3] * b[12];
    r[1] = a[0] * b[1] + a[1] * b[5] + a[2] * b[9] + a[3] * b[13];
    r[2] = a[0] * b[2] + a[1] * b[6] + a[2] * b[10] + a[3] * b[14];
    r[3] = a[0] * b[3] + a[1] * b[7] + a[2] * b[11] + a[3] * b[15];

    r[4] = a[4] * b[0] + a[5] * b[4] + a[6] * b[8] + a[7] * b[12];
    r[5] = a[4] * b[1] + a[5] * b[5] + a[6] * b[9] + a[7] * b[13];
    r[6] = a[4] * b[2] + a[5] * b[6] + a[6] * b[10] + a[7] * b[14];
    r[7] = a[4] * b[3] + a[5] * b[7] + a[6] * b[11] + a[7] * b[15];

    r[8] = a[8] * b[0] + a[9] * b[4] + a[10] * b[8] + a[11] * b[12];
    r[9] = a[8] * b[1] + a[9] * b[5] + a[10] * b[9] + a[11] * b[13];
    r[10] = a[8] * b[2] + a[9] * b[6] + a[10] * b[10] + a[11] * b[14];
    r[11] = a[8] * b[3] + a[9] * b[7] + a[10] * b[11] + a[11] * b[15];

    r[12] = a[12] * b[0] + a[13] * b[4] + a[14] * b[8] + a[15] * b[12];
    r[13] = a[12] * b[1] + a[13] * b[5] + a[14] * b[9] + a[15] * b[13];
    r[14] = a[12] * b[2] + a[13] * b[6] + a[14] * b[10] + a[15] * b[14];
    r[15] = a[12] * b[3] + a[13] * b[7] + a[14] * b[11] + a[15] * b[15];

    return result;
  };

  Matrix.identity = function(result) {
    result = result || new Matrix();
    var m = result.m;
    m[0] = m[5] = m[10] = m[15] = 1;
    m[1] = m[2] = m[3] = m[4] = m[6] = m[7] = m[8] = m[9] = m[11] = m[12] = m[13] = m[14] = 0;
    return result;
  };

  Matrix.perspective = function(fov, aspect, near, far, result) {
    var y = Math.tan(fov * Math.PI / 360) * near;
    var x = y * aspect;
    return Matrix.frustum(-x, x, -y, y, near, far, result);
  };

  Matrix.frustum = function(l, r, b, t, n, f, result) {
    result = result || new Matrix();
    var m = result.m;

    m[0] = 2 * n / (r - l);
    m[1] = 0;
    m[2] = (r + l) / (r - l);
    m[3] = 0;

    m[4] = 0;
    m[5] = 2 * n / (t - b);
    m[6] = (t + b) / (t - b);
    m[7] = 0;

    m[8] = 0;
    m[9] = 0;
    m[10] = -(f + n) / (f - n);
    m[11] = -2 * f * n / (f - n);

    m[12] = 0;
    m[13] = 0;
    m[14] = -1;
    m[15] = 0;

    return result;
  };

  Matrix.ortho = function(l, r, b, t, n, f, result) {
    result = result || new Matrix();
    var m = result.m;

    m[0] = 2 / (r - l);
    m[1] = 0;
    m[2] = 0;
    m[3] = -(r + l) / (r - l);

    m[4] = 0;
    m[5] = 2 / (t - b);
    m[6] = 0;
    m[7] = -(t + b) / (t - b);

    m[8] = 0;
    m[9] = 0;
    m[10] = -2 / (f - n);
    m[11] = -(f + n) / (f - n);

    m[12] = 0;
    m[13] = 0;
    m[14] = 0;
    m[15] = 1;

    return result;
  };

  Matrix.scale = function(x, y, z, result) {
    result = result || new Matrix();
    var m = result.m;

    m[0] = x;
    m[1] = 0;
    m[2] = 0;
    m[3] = 0;

    m[4] = 0;
    m[5] = y;
    m[6] = 0;
    m[7] = 0;

    m[8] = 0;
    m[9] = 0;
    m[10] = z;
    m[11] = 0;

    m[12] = 0;
    m[13] = 0;
    m[14] = 0;
    m[15] = 1;

    return result;
  };

  Matrix.translate = function(x, y, z, result) {
    result = result || new Matrix();
    var m = result.m;

    m[0] = 1;
    m[1] = 0;
    m[2] = 0;
    m[3] = x;

    m[4] = 0;
    m[5] = 1;
    m[6] = 0;
    m[7] = y;

    m[8] = 0;
    m[9] = 0;
    m[10] = 1;
    m[11] = z;

    m[12] = 0;
    m[13] = 0;
    m[14] = 0;
    m[15] = 1;

    return result;
  };

  Matrix.rotate = function(a, x, y, z, result) {
    if (!a || (!x && !y && !z)) {
      return Matrix.identity(result);
    }

    result = result || new Matrix();
    var m = result.m;

    var d = Math.sqrt(x*x + y*y + z*z);
    a *= Math.PI / 180; x /= d; y /= d; z /= d;
    var c = Math.cos(a), s = Math.sin(a), t = 1 - c;

    m[0] = x * x * t + c;
    m[1] = x * y * t - z * s;
    m[2] = x * z * t + y * s;
    m[3] = 0;

    m[4] = y * x * t + z * s;
    m[5] = y * y * t + c;
    m[6] = y * z * t - x * s;
    m[7] = 0;

    m[8] = z * x * t - y * s;
    m[9] = z * y * t + x * s;
    m[10] = z * z * t + c;
    m[11] = 0;

    m[12] = 0;
    m[13] = 0;
    m[14] = 0;
    m[15] = 1;

    return result;
  };

  Matrix.lookAt = function(ex, ey, ez, cx, cy, cz, ux, uy, uz, result) {
    result = result || new Matrix();
    var m = result.m;

    var e = new Vector(ex, ey, ez);
    var c = new Vector(cx, cy, cz);
    var u = new Vector(ux, uy, uz);
    var f = e.subtract(c).unit();
    var s = u.cross(f).unit();
    var t = f.cross(s).unit();

    m[0] = s.x;
    m[1] = s.y;
    m[2] = s.z;
    m[3] = -s.dot(e);

    m[4] = t.x;
    m[5] = t.y;
    m[6] = t.z;
    m[7] = -t.dot(e);

    m[8] = f.x;
    m[9] = f.y;
    m[10] = f.z;
    m[11] = -f.dot(e);

    m[12] = 0;
    m[13] = 0;
    m[14] = 0;
    m[15] = 1;

    return result;
  };

return Matrix;
})();

exports = module.exports = Matrix;

},{}],5:[function(require,module,exports){
/* Using K3D library for meshes. http://k3d.ivank.net/ */
'use strict';

var Entity = require('./Entity');
var Color  = require('./Color');
/* needs K3D library for parsing meshes */
var Mesh, exports;

Mesh = (function(gl) {
  function Mesh() {
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



return Mesh;
})();

exports = module.exports = Mesh;

},{"./Color":1,"./Entity":2}],6:[function(require,module,exports){
'use strict';

var NodeTree, exports;

NodeTree = (function() {
  function NodeTree(entity, father, children) {
    this.entity    = entity   || '';
    this.father    = father   || '';
    this.children  = children || [];
  }

  NodeTree.prototype.getFather = function() {
    return this.father;
  };

  NodeTree.prototype.setFather = function(father) {
    this.father = father;
  }

  NodeTree.prototype.getEntity = function() {
    return this.entity;
  }

  NodeTree.prototype.setEntity = function(entity) {
    this.entity = entity;
  }

  NodeTree.prototype.index = function() {
    if (!this.isRoot()) return this.father.children.indexOf(this);
  }

  NodeTree.prototype.isRoot = function() {
    return (this.father == '');
  };

  NodeTree.prototype.childrenNumber = function() {
    return this.children.length;
  };

  NodeTree.prototype.nextSibling = function() {
    return ((!this.isRoot()) && (this.hasSibling())) ? this.father.getChild(this.index() +1) : null;
  };

  NodeTree.prototype.hasSibling = function() {
    return (this.father.existsChild(this.father.getChild(this.index() +1 )));
  }

  NodeTree.prototype.addChild = function(child) {
    child.setFather(this);
    this.children.push(child);
  };

  NodeTree.prototype.newChild = function() {
    return this.addChild(new NodeTree('', this, []));
  };

  NodeTree.prototype.getChild = function(index) {
    return (this.existsChild(this.children[index])) ? this.children[index] : null;
  };

  NodeTree.prototype.firstChild = function() {
    return this.getChild(0);
  };

  NodeTree.prototype.lastChild = function() {
    return this.getChild(this.childrenNumber() -1);
  };

  NodeTree.prototype.removeChild = function(child) {
    (this.existsChild(child)) ? this.children.splice(this.index(), 1) : false;
  };

  NodeTree.prototype.removeChildren = function() {
    this.children = [];
  };

  NodeTree.prototype.delete = function() {
    this.father.removeChild(this);
  };

  NodeTree.prototype.existsChild = function(child) {
    return (this.children.indexOf(child) != -1);
  };

  NodeTree.prototype.draw = function() {
    if (this.entity) {
      var children = this.children;
      this.entity.beginDraw(children);
      this.entity.endDraw();
    } else {
      console.log('There is no entity for this node');
    }
  };

  return NodeTree;
})();

exports = module.exports = NodeTree;

},{}],7:[function(require,module,exports){
'use strict';

var Resource = require('./resource');
var File     = require("fs");
var ResourceManager, exports;

ResourceManager = (function(path) {
  function ResourceManager(path) {
    this.resources = [];
    this.path      = path || '';
    this.file      = require("fs");
  }

ResourceManager.prototype.getResource = function(name) {
  var resource = this.searchResource(name);
  if (!resource) {
    resource = new Resource(name, '');
    this.writeResource(resource);
  }
  return resource;
};

ResourceManager.prototype.writeResource = function(resource) {
  this.file.appendFileSync(this.path, resource.name + '#' + resource.data + '\n');
}

ResourceManager.prototype.readName = function(line) {
  return line.split('#')[0];
}

ResourceManager.prototype.readData = function(line) {
  return line.split('#')[1];
}

ResourceManager.prototype.getFileText = function(path) {
  console.log(this.file);
  this.path = path;
  return this.file.readFileSync(this.path).toString();
};

ResourceManager.prototype.getFileContent = function() {
  return this.file.readFileSync(this.path).toString().split('\n');
}

ResourceManager.prototype.searchResource = function(name) {
  var fileContent = this.getFileContent();
  var i = 0;
  while ( i < fileContent.length) {
    if (this.readName(fileContent[i]) == name) return fileContent[i];
    i++;
  }
  return false;
}

ResourceManager.prototype.addResource = function(resource) {
  this.resources.push(resource);
}

ResourceManager.prototype.getFile = function() {
  return this.file;
}

ResourceManager.prototype.setPath = function(path) {
  this.path = path;
}

ResourceManager.prototype.getPath = function(path) {
  return this.path;
}

ResourceManager.prototype.readAllResources = function() {
  var resource = null;
  this.getFileContent().forEach(function (line) {
    resource = new Resource(this.readName(line), this.readData(line));
    this.resources.push(resource);
  })
}
  return ResourceManager;
})();

exports = module.exports = ResourceManager;

},{"./resource":14,"fs":15}],8:[function(require,module,exports){
'use strict';

var NodeTree     = require('./NodeTree');
var Tree         = require('./Tree');
var Shader       = require('./Shader');
var Scene, exports;

Scene = (function() {
  function Scene(gl, program) {
    this.root    = new NodeTree();
    this.tree    = new Tree(this.root);
    this.matrix  = new Array();
    this.gl      = gl;
    this.shader  = new Shader();
  }

  Scene.prototype.setGl = function(gl) {
    this.gl = gl;
  };

  Scene.prototype.getLastMatrix = function() {
    	if (this.matrix.length>0) return this.matrix[this.matrix.length-1];
    	else return null;
  };

  Scene.prototype.getMatrix = function() {
    return this.matrix;
  };

  Scene.prototype.getRoot = function() {
    return this.root;
  };

  Scene.prototype.getTree = function() {
    return this.tree;
  };

  return Scene;
})();

exports = module.exports = Scene;

},{"./NodeTree":6,"./Shader":9,"./Tree":12}],9:[function(require,module,exports){
'use strict';

var Shader, exports;
Shader = (function(gl) {
  function Shader(gl) {
    this.program      = null; //gl.createProgram
    this.vertices     = null;
    this.indices      = null;

    //attributes pointing to the current VBO
    this.index        = null;
    this.size         = null;
    this.type         = null; //FIXED, BYTE, UNSIGNED_BYTE, FLOAT, SHORT, or UNSIGNED_SHORT.
    this.norm         = null;
    this.stride       = null;
    this.offset       = null;
    this.pointer      = null;


    this.vertexBuffer = null; //gl.createBuffer();//current VBO
    this.indexBuffer  = null; //gl.createBuffer();

    this.vertexShader   = document.getElementById('vertexShader');
    this.fragmentShader = document.getElementById('fragmentShader');
  }

  Shader.prototype.setProgram = function(program) {
    this.program = program;
  };

  Shader.prototype.getVertexShader = function() {
    return this.vertexShader.innerHTML;
  };

  Shader.prototype.getFragmentShader = function() {
    return this.fragmentShader.innerHTML;
  };

  Shader.prototype.getVertices = function() {
    return this.vertices;
  };

  Shader.prototype.getIndices = function() {
    return this.indices;
  };

  Shader.prototype.setVertices = function(vertices) {
    this.vertices = vertices;
  };

  Shader.prototype.setIndices = function(indices) {
    this.indices = indices;
  };

  Shader.prototype.getVertexBuffer = function() {
    return this.vertexBuffer;
  };

  Shader.prototype.getIndexBuffer = function() {
    return this.indexBuffer;
  };

  Shader.prototype.setBuffers = function(context) { //context = Aubengine.gl
    context.bindBuffer(context.ARRAY_BUFFER, this.getVertexBuffer());
    context.bufferData(context.ARRAY_BUFFER, new Float32Array(this.getVertices()), context.STATIC_DRAW);
    context.bindBuffer(context.ARRAY_BUFFER, null);

    context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, this.getIndexBuffer());
    context.bufferData(context.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.getIndices()), context.STATIC_DRAW);
    context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, null);
  }

  Shader.prototype.setPointer = function(context) {
    this.pointer = context.vertexAttribPointer(this.index, this.size, this,type, this.norm, this.stride, this.offset);
  }

  Shader.prototype.getPointer = function(context) {
    return this.pointer;
  };


  Shader.prototype.vertexName = function() {
    return "x-shader/x-vertex";
  };


  Shader.prototype.fragmentName = function() {
    return "x-shader/x-fragment";
 };

  Shader.prototype.createShader = function(type) {
    if (type == 'VERTEX') {return gl.createShader(gl.VERTEX_SHADER)}
    else if (type == 'FRAGMENT') {return gl.createShader(gl.FRAGMENT_SHADER)}
    else {console.log('Incorrect shader'); return null};
  };

  Shader.prototype.checkCompilation = function(gl, shader) {
    if (!gl.getShaderParameters(shader, gl.COMPILE_STATUS)) return false;
  }

  Shader.prototype.addShader = function(type, gl, program, source) {
    var shader = this.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!this.checkCompilation(gl, shader)) return gl.getShaderInfoLog(shader);
    gl.attachShader(program, shader);
  };

  Shader.prototype.initProgram = function(gl) {
    var program = null;
    if (this.program == null) { //no program yet, it has to read the shaders
      program = gl.createProgram();
      this.addShader('VERTEX',   gl, program, this.getVertexShader());
      this.addShader('FRAGMENT', gl, program, this.getFragmentShader());
      gl.linkProgram(program);
      gl.useProgram(program);
      return program;
    } else { //use the current program configuration
      return this.program;
    };
  };

  Shader.prototype.draw = function(gl) { //the beginDraw hardrock function
    //Initiate the program with the shader configuration
      var program = this.initProgram(gl);
      /* TODO */
      //1. Vertex Configuration. Model View matrix.
      //2. Lights Configuration.
      //3. Textures Configuration.
      //4. Camera Configuration
      //5. Bind Buffers
  };

  return Shader;
})();

exports = module.exports = Shader;

},{}],10:[function(require,module,exports){
'use strict';

var ShadersContent, exports;

ShadersContent = (function() {
  function ShadersContent() {
  }

  ShadersContent.prototype.vertexContent =
    'const int NUM_LIGHTS = 4;'+

    'attribute vec3 aVertexPosition;'+
    'attribute vec3 aVertexNormal;'+
    'attribute vec4 aVertexColor;'+

    'uniform mat4 uMVMatrix;'+
    'uniform mat4 uPMatrix;'+
    'uniform mat4 uNMatrix;'+

    'uniform bool uTranslateLights;'+
    'uniform vec3 uLightPosition[NUM_LIGHTS];'+


    'varying vec3 vNormal;'+
    'varying vec3 vLightRay[NUM_LIGHTS];'+
    'varying vec3 vEye[NUM_LIGHTS];'+

    'void main(void) {'+

    '     vec4 c = aVertexColor;'+
    '     vec4 vertex = uMVMatrix * vec4(aVertexPosition, 1.0);'+
    '     vNormal = vec3(uNMatrix * vec4(aVertexNormal, 1.0));'+
    '     vec4 lightPosition = vec4(0.0);'+

    '     if (uTranslateLights){'+
    '         for(int i=0; i < NUM_LIGHTS; i++){'+
    '           lightPosition =   uMVMatrix * vec4(uLightPosition[i], 1.0);'+
    '           vLightRay[i] = vertex.xyz - lightPosition.xyz;'+
    '           vEye[i] = -vec3(vertex.xyz);'+
    '         }'+
    '     }'+
    '     else {'+
    '        for(int i=0; i < NUM_LIGHTS; i++){'+
    '          lightPosition = vec4(uLightPosition[i], 1.0);'+
    '          vLightRay[i] = vertex.xyz - lightPosition.xyz;'+
    '          vEye[i] = -vec3(vertex.xyz);'+
    '        }'+
    '    }'+
    '    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);'+
    '}';

  ShadersContent.prototype.fragmentContent = 
    '#ifdef GL_ES'+
    'precision highp float;'+
    '#endif'+


    //Light uniforms
    'const int NUM_LIGHTS = 4;'+
    'uniform vec3  uLa[NUM_LIGHTS];'+   //ambient
    'uniform vec3  uLd[NUM_LIGHTS];'+   //diffuse
    'uniform vec3  uLs[NUM_LIGHTS];'+ //specular
    'uniform vec3 uLightPosition[NUM_LIGHTS];'+

    //Material uniforms
    'uniform vec3  uKa;'+   //ambient
    'uniform vec3  uKd;'+   //diffuse
    'uniform vec3  uKs;'+   //specular
    'uniform float uNs;'+   //specular coefficient
    'uniform float d;'+     //Opacity
    'uniform int   illum;'+ //Illumination mode


    'uniform bool  uWireframe;'+


    'varying vec3 vNormal;'+
    'varying vec3 vLightRay[NUM_LIGHTS];'+
    'varying vec3 vEye[NUM_LIGHTS];'+

    'float calculateAttenuation(in vec3 ray){'+
    '    float dist = length(ray);'+
    '    return (1.0 / (0.1 * dist));'+
    '}'+

    'void main(void) {'+
    '    if (uWireframe || illum == 0){'+
    '        gl_FragColor = vec4(uKd,d);'+
    '        return;'+
    '    }'+

    '   vec3 COLOR = vec3(0.0,0.0,0.0);'+
    '   vec3 N =  normalize(vNormal);'+
    '   vec3 L =  vec3(0.0,0.0,0.0);'+
    '   vec3 E =  vec3(0.0,0.0,0.0);'+
    '   vec3 R =  vec3(0.0,0.0,0.0);'+
    '   vec3 deltaRay = vec3(0.0);'+
    '   const int  lsize = 2;'+
    '   const float step = 0.25;'+
    '   const float inv_total = 1.0/((float(lsize*lsize) + 1.0)*(float(lsize*lsize) + 1.0));'+  //how many deltaRays

    '   float dx = 0.0;'+
    '   float dz = 0.0;'+
    '   float LT = 0.0;'+

    '   if (illum == 1){'+
    '        for(int i = 0; i < NUM_LIGHTS; i++){'+
    '            L = normalize(vLightRay[i]);'+
    '            N = normalize(vNormal);'+
    '            COLOR += (uLa[i] * uKa) + (uLd[i] * uKd * clamp(dot(N, -L),0.0,1.0));'+
    '        }'+
    '        gl_FragColor =  vec4(COLOR,d);'+
    '        return;'+
    '   }'+

    '   if (illum == 2){'+
    '        for(int i = 0; i < NUM_LIGHTS; i++){'+

    '            E = normalize(vEye[i]);'+
    '            L = normalize(vLightRay[i]);'+
    '            R = reflect(L, N);'+
    '            COLOR += (uLa[i] * uKa);'+
    '            COLOR += (uLd[i] * uKd * clamp(dot(N,-L),0.0,1.0));'+// * calculateAttenuation(vLightRay[i]));
    '            COLOR += (uLs[i] * uKs * pow( max(dot(R, E), 0.0), uNs) * 4.0);'+
    '        }'+
    '        gl_FragColor =  vec4(COLOR,d);'+
    '        return;'+
    '   }'+
    '}';

  return ShadersContent;
})();

exports = module.exports = ShadersContent;

},{}],11:[function(require,module,exports){
'use strict';

var Matrix = require('./Matrix');

var Transform, exports;
Transform = (function(attributes) {
  function Transform(matrix) {
    this.matrix = matrix || new Matrix();
  }

Transform.prototype.scale = function(gl, x, y, z, matrix) {
  return this.matrix.scale(x, y, z, matrix);
};

Transform.prototype.rotate = function() {
  /* TODO */
};

Transform.prototype.translate = function(light) {
  /* TODO */
};

return Transform;
})();

exports = module.exports = Transform;

},{"./Matrix":4}],12:[function(require,module,exports){
'use strict';

var Tree, exports;
Tree = (function(root) {
  function Tree(root) {
    this.root            = root;
    this.entityMatrix    = [];
  }

  Tree.prototype = {
    getRoot : function() {
      return this.root;
    },

    preorder  : function(node, doSomething) {
        if (node == null) return;
        doSomething(node);
        this.preorder(node.firstChild(), doSomething);
        this.preorder(node.nextSibling(), doSomething);
    },

    pushEntity : function(entity) {
      this.entityMatrix.push(entity);
    },

    popEntity : function() {
      this.entityMatrix.pop();
    },

    inorder   : function() {
      /* TODO */
    },

    postorder : function() {
      /* TODO */
    }
  }

  return Tree;
})();

exports = module.exports = Tree;

},{}],13:[function(require,module,exports){
'use strict';
var Aubengine = window.Aubengine || {}, exports;

/* Dependencies */
var Entity     = require('./Entity')
var Shader     = require('./Shader');
var Color      = require('./Color');
var Transform  = require('./Transform');
var Mesh       = require('./Mesh');
var Light      = require('./Light');
var Scene      = require('./Scene');
var Manager    = require('./ResourceManager');
var Content    = require('./ShadersContent');

Aubengine = (function(width, height, canvasId) {
  function Aubengine(width, height, canvasId) {
    /* Properties */
    this.width     = width;
    this.height    = height;
    this.names     = ['webgl', 'experimental-webgl', 'webkit-3d', 'moz-webgl'];
    this.canvasId  = canvasId;

    /* WebGL elements*/
    this.gl        = null;

    /* Entities */
    this.mesh      = new Mesh();
    this.light     = new Light();
    this.color     = new Color();
    this.transform = new Transform();
    this.shader    = new Shader(this.gl);

    /* Scene */
    this.scene   = new Scene(this.gl, this.program);

    /* Resource Manager */
    this.content = new Content();
    this.vertexShaderContent   = this.content.vertexContent;
    this.fragmentShaderContent = this.content.fragmentContent;
}

  Aubengine.prototype.setVertexShaderContent = function(content) {
    this.vertexShaderContent = content;
  };

  Aubengine.prototype.getManager = function() {
    return this.manager;
  }
  /* Basic previous configuration */
  Aubengine.prototype.getGl = function() {
    return this.gl;
  };

  Aubengine.prototype.setGl = function(gl) {
    this.gl = gl;
    this.scene.setGl(gl);
  };

  Aubengine.prototype.setProgram = function(program) {
    this.program = program;
    this.scene.setProgram(program);
  };

  Aubengine.prototype.setShaders = function(content, type) {
       var script = document.createElement('script');
       script.setAttribute('type', type);
       script.innerHTML = content;
       document.body.appendChild(script);
  }

  Aubengine.prototype.startWeb = function() {
    var canvas = document.getElementById(this.canvasId);
    var i = 0;
    this.gl = canvas.getContext('webgl');
    this.setShaders(this.vertexShaderContent,   this.shader.vertexName());
    this.setShaders(this.fragmentShaderContent, this.shader.fragmentName());
    // while ((this.gl == null) && (i < this.names.length)) {
    //   console.log(this.names[i]);
    //   try {
    //     this.gl = canvas.getContext(this.names[i]);
    //   } catch (e) {
    //     console.log(e);
    //   };
    //   i++;
    // }
  };

  Aubengine.prototype.createBuffer = function() {
    this.gl.createBuffer();
  };

  Aubengine.prototype.isStarted = function() {
    if (this.gl == null) {return false;}
    else {return true;}
  };



/* Main functions, the real magic */
  Aubengine.prototype.clear = function() {
    if (this.isStarted()) {
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
      this.gl.viewport(0, 0, this.width, this.height);
    }
  };

  Aubengine.prototype.changeColor = function(color) {
    if (this.isStarted()) {
      this.gl.clearColor(color[0], color[1], color[2], color[3]);
      this.clear(this.gl);
    }
  };

  Aubengine.prototype.scale = function(gl, x, y, z, matrix) {
    this.transform.scale(gl, x, y, z, matrix);
  };

return Aubengine;
})();

exports = module.exports = Aubengine;

window.Aubengine = Aubengine;

},{"./Color":1,"./Entity":2,"./Light":3,"./Mesh":5,"./ResourceManager":7,"./Scene":8,"./Shader":9,"./ShadersContent":10,"./Transform":11}],14:[function(require,module,exports){
'use strict';

var Resource, exports;

Resource = (function() {
  function Resource(name, data) {
    this.name = name;
    this.data = data || '';
  }

  Resource.prototype.setName = function(name) {
    this.name = name;
  }

  Resource.prototype.getName = function() {
    return this.name;
  }

  return Resource;
})();

exports = module.exports = Resource;

},{}],15:[function(require,module,exports){

},{}]},{},[13])