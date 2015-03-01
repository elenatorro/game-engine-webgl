'use strict';

function Light(name){
	this.id = name;
	this.position = [0.0,0.0,0.0];
	this.ambient  = [0.0,0.0,0.0,0.0];
	this.diffuse  = [0.0,0.0,0.0,0.0];
	this.specular = [0.0,0.0,0.0,0.0];
}

  Light.prototype.setPosition = function(position) {
  	this.position = position.slice(0);
  }
  Light.prototype.setDiffuse = function (diffuse) {
  	this.diffuse = diffuse.slice(0);
  }

  Light.prototype.setAmbient = function(ambient) {
  	this.ambient = ambient.slice(0);
  }

  Light.prototype.setSpecular = function(specular) {
  	this.specular = specular.slice(0);
  }

  Light.prototype.setProperty = function(name, value) {
  	if(typeof name == 'string'){
  		if (value instanceof Array){
  			this[name] = value.slice(0);
  		}
  		else {
  			this[name] = value;
  		}
  	}
  	else{
  		throw 'The property name must be a string';
  	}
  }
