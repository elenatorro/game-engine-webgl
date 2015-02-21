(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Aubengine, exports;
Aubengine = (function(width, height, canvasId) {

  function Aubengine(width, height, canvasId) {
    this.width     = width;
    this.height    = height;
    this.names     = ['webgl', 'experimental-webgl', 'webkit-3d', 'moz-webgl'];
    this.canvasId  = canvasId;
    this.gl        = null;
    this.buffer    = null;
  }

Aubengine.prototype.startWeb = function() {
    var canvas = document.getElementById(this.canvasId);
    var i = 0;
    while ((this.gl == null) && (i < this.names.length)) {
      try {
        this.gl = canvas.getContext(this.names[i]);
      } catch (e) {
        console.log(e);
      };
      i++;
    }
  };

  Aubengine.prototype.createBuffer = function() {
    this.gl.createBuffer();
  };

  Aubengine.prototype.isStarted = function() {
    if (this.gl == null) {return false;}
    else {return true;}
  };

  Aubengine.prototype.clear = function() {
    if (this.isStarted()) {
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
      this.gl.viewport(0, 0, this.width, this.height);
    }
  },

  Aubengine.prototype.changeColor = function(color) {
    if (this.isStarted()) {
      this.gl.clearColor(color[0], color[1], color[2], color[3]);
      this.clear(this.gl);
    }
  };

  Aubengine.prototype.hex2rgb = function(hex, opacity) {
    hex = hex.replace('#','');
    var r = parseInt(hex.substring(0,2), 16);
    var g = parseInt(hex.substring(2,4), 16);
    var b = parseInt(hex.substring(4,6), 16);
    return [r/255,g/255,b/255,opacity];
  };

  Aubengine.prototype.addShader = function(Shader) {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, Shader.getVertexBuffer());
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(Shader.getVertices()), this.gl.STATIC_DRAW);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);

    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, Shader.getIndexBuffer());
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(Shader.getIndices()), this.gl.STATIC_DRAW);
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
  }

return Aubengine;
})();

exports = module.exports = Aubengine;

},{}],2:[function(require,module,exports){
'use strict';

var Entity, exports;

Entity = (function() {
  function Entity(attributes) {
    this.attributes = attributes;
  }

Entity.prototype.beginDraw = function(attribute) {};
Entity.prototype.endDraw   = function(attribute) {}; //desapila

  return Entity;
})();

exports = module.exports = Entity;

},{}],3:[function(require,module,exports){
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
    if (this.entity) this.entity.beginDraw();
    this.children.forEach(function(child){child.draw();});
    if (this.entity) this.entity.endDraw();
  };

  return NodeTree;
})();

exports = module.exports = NodeTree;

},{}],4:[function(require,module,exports){
'use strict';

var Aubengine = require('./Aubengine');
var Shader, exports;
Shader = (function(vertices, indices, index, size, type, norm, stride, offset) {
  function Shader(vertices, indices, index, size, type, norm, stride, offset) {
    this.vertices = vertices;
    this.indices  = indices;
    this.index    = index;
    this.size     = size;
    this.type     = type;
    this.norm     = norm;
    this.stride   = stride;
    this.offset   = offset;
    this.vertexBuffer = Aubengine.gl.createBuffer();
    this.indexBuffer  = Aubengine.gl.createBuffer();
  }

Shader.prototype.getVertices = function() {
  return this.vertices;
};

Shader.prototype.getIndices = function() {
  return this.indices;
};

Shader.prototype.getVertexBuffer = function() {
  return this.vertexBuffer;
};

Shader.prototype.getIndexBuffer = function() {
  return this.indexBuffer;
};

Shader.prototype.createVertex = function() {
  var content = 'attribute vec3 aVertexPosition' +
                'void main(void) {' +
                'gl_Position = vec4(aVertexPosition, 1.0);' +
                '}';

  var script = document.createElement('script');
  script.setAttr('type', 'x-shader/x-vertex');
  script.innerHTML = content;
  document.body.appendChild(script);
};

return Shader;
})();

exports = module.exports = Shader;

},{"./Aubengine":1}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
'use strict';

var Entity     = require('./Entity')
var NodeTree   = require('./NodeTree');
var Tree       = require('./Tree');
var Aubengine  = require('./Aubengine');
var Shader     = require('./Shader');


var aubengine = new Aubengine(200, 200, 'canvas');
var root      = new NodeTree();
var tree      = new Tree(root);

aubengine.startWeb();
document.getElementById('changeColor').addEventListener('change', function(event) {
  aubengine.changeColor(aubengine.hex2rgb(this.value,1));
});

},{"./Aubengine":1,"./Entity":2,"./NodeTree":3,"./Shader":4,"./Tree":5}]},{},[6])