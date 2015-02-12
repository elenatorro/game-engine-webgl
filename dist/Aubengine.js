(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
/* Entity */
// -- Object ------------------------------------------------------
var Entity, exports;

Entity = (function() {
  function Entity(attributes) {
    this.attributes    = attributes;
  }

Entity.prototype.beginDraw = function(attribute) {};
Entity.prototype.endDraw   = function(attribute) {};

  return Entity;
})();

// -- Export ------------------------------------------------------
exports = module.exports = Entity;

},{}],2:[function(require,module,exports){
'use strict';
// -- Object ------------------------------------------------------
var NodeTree, exports;

NodeTree = (function() {
  function NodeTree(entity, father, index, children) {
    this.entity    = entity || '';
    this.father    = father || '';
    this.index     = index  || 0;
    this.children  = children || [];
  }

  NodeTree.prototype.getFather = function() {
    return this.father;
  };

  NodeTree.prototype.isRoot = function() {
    return (this.father == '');
  };

  NodeTree.prototype.childrenNumber = function() {
    return this.children.length;
  };

  NodeTree.prototype.nextSibling = function() {
    return ((!this.isRoot()) && (this.father.existsChild(this.index +1))) ? this.father.getChild(this.index +1) : null;
  };

  NodeTree.prototype.addChild = function(index, child) {
    this.children[index] = child;
  };

  NodeTree.prototype.newChild = function() {
    return this.addChild(this.childrenNumber(), new NodeTree('', this, this.childrenNumber(), []));
  };

  NodeTree.prototype.getChild = function(index) {
    return (this.existsChild(index)) ? this.children[index] : null;
  };

  NodeTree.prototype.firstChild = function() {
    return this.getChild(0);
  };

  NodeTree.prototype.lastChild = function() {
    return this.getChild(this.childrenNumber() -1);
  };

  NodeTree.prototype.removeChild = function(index) {
    /* TODO: correr los elementos del array */
    (this.existsChild(index)) ? this.children[index] = null : false;
  };

  NodeTree.prototype.removeChildren = function() {
    this.children = [];
  };

  NodeTree.prototype.delete = function() {
    this.father.removeChild(this.index);
  };

  NodeTree.prototype.existsChild = function(index) {
    return (this.children[index] != null);
  };

  NodeTree.prototype.draw = function() {
    this.entity.beginDraw();
    this.children.forEach(function(child){ child.draw();});
    this.entity.endDraw();
  };

  return NodeTree;
})();

// -- Export ------------------------------------------------------
exports = module.exports = NodeTree;

},{}],3:[function(require,module,exports){
'use strict';
/* Shader */
// -- Object ------------------------------------------------------
var Spider = require('./Spider');
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
    this.vertexBuffer = Spider.gl.createBuffer();
    this.indexBuffer  = Spider.gl.createBuffer();
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

// -- Export ------------------------------------------------------
exports = module.exports = Shader;

},{"./Spider":4}],4:[function(require,module,exports){
'use strict';
/* Spider */
// -- Object ------------------------------------------------------
var Spider, exports;
Spider = (function(width, height, canvasId) {

  function Spider(width, height, canvasId) {
    this.width     = width;
    this.height    = height;
    this.names     = ['webgl', 'experimental-webgl', 'webkit-3d', 'moz-webgl'];
    this.canvasId  = canvasId;
    this.gl        = null;
    this.buffer    = null;
  }

Spider.prototype.startWeb = function() {
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

  Spider.prototype.createBuffer = function() {
    this.gl.createBuffer();
  };

  Spider.prototype.isStarted = function() {
    if (this.gl == null) {return false;}
    else {return true;}
  };

  Spider.prototype.clear = function() {
    if (this.isStarted()) {
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
      this.gl.viewport(0, 0, this.width, this.height);
    }
  },

  Spider.prototype.changeColor = function(color) {
    if (this.isStarted()) {
      this.gl.clearColor(color[0], color[1], color[2], color[3]);
      this.clear(this.gl);
    }
  };

  Spider.prototype.hex2rgb = function(hex, opacity) {
    hex = hex.replace('#','');
    var r = parseInt(hex.substring(0,2), 16);
    var g = parseInt(hex.substring(2,4), 16);
    var b = parseInt(hex.substring(4,6), 16);
    return [r/255,g/255,b/255,opacity];
  };

  Spider.prototype.addShader = function(Shader) {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, Shader.getVertexBuffer());
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(Shader.getVertices()), this.gl.STATIC_DRAW);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);

    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, Shader.getIndexBuffer());
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(Shader.getIndices()), this.gl.STATIC_DRAW);
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
  }

return Spider;
})();

// -- Export -------------------------------------------------------------------
exports = module.exports = Spider;

},{}],5:[function(require,module,exports){
'use strict';
/* Tree */
// -- Object ------------------------------------------------------
var NodeTree = require('./NodeTree.js');
var Tree, exports;
Tree = (function(parent) {
  function Tree(parent) {
    this.parent          = parent;
    this.entityMatrix    = [];
  }

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

  return Tree;
})();

// -- Export ------------------------------------------------------
exports = module.exports = Tree;

},{"./NodeTree.js":2}],6:[function(require,module,exports){
'use strict';

var Entity   = require('./Entity')
var NodeTree = require('./NodeTree');
var Tree = require('./Tree');
var Spider = require('./Spider');
var Shader = require('./Shader');


var spider = new Spider(200, 200, 'canvas');
var father = new NodeTree();
var tree   = new Tree(father);
console.log(tree);
spider.startWeb();
document.getElementById('changeColor').addEventListener('change', function(event) {
  spider.changeColor(spider.hex2rgb(this.value,1));
});

},{"./Entity":1,"./NodeTree":2,"./Shader":3,"./Spider":4,"./Tree":5}]},{},[6])