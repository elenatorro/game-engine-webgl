'use strict';

function Scene(gl, program) {
    this.root       = new NodeTree();
    this.tree       = new Tree(this.root);
    this.modelView  = new Array();
    this.gl         = gl;
    this.shader     = new Shader();
  };

  Scene.prototype.setGl = function(gl) {
    this.gl = gl;
  };

  Scene.prototype.getLastMatrix = function() {
    	if (this.modelView.length>0) return this.modelView[this.modelView.length-1];
    	else return null;
  };

  Scene.prototype.getModelView = function() {
    return this.modelView;
  };

  Scene.prototype.getRoot = function() {
    return this.root;
  };

  Scene.prototype.getTree = function() {
    return this.tree;
  };

  Scene.prototype.createSceneTree = function() {
    /* TODO */
    //takes the resource manager content and draws the tree
  };


  /* scene lights */
  var Lights = {
  	list : [],
  	add : function(light) {
      if (!(light instanceof Light)){
        alert('the parameter is not a light');
        return;
      }
      this.list.push(light);
  	},

  	getArray: function(type) {
  		var array = [];
      this.list.forEach(function(element, index) {
        array = array.concat(element[type]);
      })
      return array;
  	},

  	get: function(index){
  		if ((typeof index == 'number') && index >= 0 && index < this.list.length){
  			return this.list[index];
  		}
  		else if (typeof index == 'string'){
  			for(var i=0, max = this.list.length; i < max; i+=1){
  				if (this.list[i].id == index) return this.list[i];
  			}
  			throw 'Light ' + index + ' does not exist';
  		}
  		else {
  			throw 'Unknown parameter';
  		}
  	}
  }
