'use strict';

var Entity     = require('./Entity')
var NodeTree   = require('./NodeTree');
var Tree       = require('./Tree');
var Aubengine  = require('./Aubengine');
var Shader     = require('./Shader');
var Color      = require('./Color');


var aubengine = new Aubengine(200, 200, 'canvas');
var root      = new NodeTree();
var tree      = new Tree(root);

aubengine.startWeb();
document.getElementById('changeColor').addEventListener('change', function(event) {
  aubengine.changeColor(aubengine.color.hex2rgb(this.value,1));
});



/* TODO: draw a square when click*/
document.getElementById('drawSquare').addEventListener('', )
