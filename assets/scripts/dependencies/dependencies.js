var Shader = function(vertices, indices, index, size, type, norm, stride, offset) {
  this.vertices = vertices;
  this.indices  = indices;
  this.index    = index;
  this.size     = size;
  this.type     = type;
  this.norm     = norm;
  this.stride   = stride;
  this.offset   = offset;
  this.vertexBuffer = Spider.gl.createBuffer();
  this.indexBuffer  = Spider.gl.createBuffer();
}

Shader.prototype.getVertices = function() {
  return this.vertices;
}

Shader.prototype.getIndices = function() {
  return this.indices;
}

Shader.prototype.getVertexBuffer = function() {
  return this.vertexBuffer;
}

Shader.prototype.getIndexBuffer = function() {
  return this.indexBuffer;
}

Shader.prototype.createVertex = function() {
  var content = 'attribute vec3 aVertexPosition' +
                'void main(void) {' +
                'gl_Position = vec4(aVertexPosition, 1.0);' +
                '}';

  var script = document.createElement('script');
  script.setAttr('type', 'x-shader/x-vertex');
  script.innerHTML = content;
  document.body.appendChild(script);
}

var Spider = {
  //__privated variables
  gl      : null,
  width   : 800,
  height  : 800,
  names : ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"],
  buffer  : null,

  //__functions
  startWeb: function(canvasId, width, height) {
    var canvas = document.getElementById(canvasId);
    Spider.width = width;
    Spider.height = height;
    var i = 0;
    // Spider.gl = canvas.getContext('webgl');
    while ((Spider.gl == null) && (i < Spider.names.length)) {
      try {
          Spider.gl = canvas.getContext(Spider.names[i]);
        } catch (e) {
          console.log(e)
        };
        i++;
    }
  },

  createBuffer: function() {
    Spider.gl.createBuffer();
  },

  isStarted: function() {
    if (Spider.gl == null) return false;
    else return true;
  },

  clear: function() {
    if (Spider.isStarted()) {
      Spider.gl.clear(Spider.gl.COLOR_BUFFER_BIT);
      Spider.gl.viewport(0, 0, Spider.width, Spider.height);
    }
  },

  changeColor: function(color) {
    if (Spider.isStarted()) {
      Spider.gl.clearColor(color[0], color[1], color[2], color[3]);
      Spider.clear(Spider.gl);
    }
  },

  hex2rgb: function(hex, opacity) {
      hex = hex.replace('#','');
      r = parseInt(hex.substring(0,2), 16);
      g = parseInt(hex.substring(2,4), 16);
      b = parseInt(hex.substring(4,6), 16);
      return [r/255,g/255,b/255,opacity];
    },

  addShader: function(Shader) {
    Spider.gl.bindBuffer(Spider.gl.ARRAY_BUFFER, Shader.getVertexBuffer());
    Spider.gl.bufferData(Spider.gl.ARRAY_BUFFER, new Float32Array(Shader.getVertices()), Spider.gl.STATIC_DRAW);
    Spider.gl.bindBuffer(Spider.gl.ARRAY_BUFFER, null);

    Spider.gl.bindBuffer(Spider.gl.ELEMENT_ARRAY_BUFFER, Shader.getIndexBuffer());
    Spider.gl.bufferData(Spider.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(Shader.getIndices()), gl.STATIC_DRAW);
    Spider.gl.bindBuffer(Spider.gl.ELEMENT_ARRAY_BUFFER, null);
  }
};

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
