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
