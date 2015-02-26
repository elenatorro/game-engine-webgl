'use strict';

/* Dependencies */
var Entity     = require('./Entity')
var NodeTree   = require('./NodeTree');
var Tree       = require('./Tree');
var Aubengine  = require('./Aubengine');
var Shader     = require('./Shader');
var Color      = require('./Color');

/* Engine utilities */
var root      = new NodeTree();
var tree      = new Tree(root);
var path      = '../rm.txt';
var rm        = new ResourceManager(path);

/* Engine */
var aubengine = new Aubengine(200, 200, 'canvas', tree, rm);


aubengine.startWeb();
document.getElementById('changeColor').addEventListener('change', function(event) {
  aubengine.changeColor(aubengine.color.hex2rgb(this.value,1));
});



/* TODO: draw a square when click*/
document.getElementById('drawSquare').addEventListener('', )
