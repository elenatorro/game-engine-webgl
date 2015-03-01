'use strict';
/* uses gl-matrix-min.js */
var CAMERA_ORBITING_TYPE = 1;
var CAMERA_TRACKING_TYPE = 2;

function Camera(t){
    this.matrix     = mat4.create();
    this.up         = vec3.create();
    this.right      = vec3.create();
    this.normal     = vec3.create();
    this.position   = vec3.create();
    this.focus      = vec3.create();
    this.observer   = 0.0;
    this.elevation  = 0.0;
    this.type       = t; //1 or 2
    this.steps      = 0;

    this.home = vec3.create();

    this.hookRenderer = null;
    this.hookGUIUpdate = null;

    this.FOV = 30;
    this.minZ = 0.1;
    this.maxZ = 10000

    this.prototype = new Entity();
}

Camera.prototype.setType = function(type){
    this.type = type;
    if (type != CAMERA_ORBITING_TYPE && type != CAMERA_TRACKING_TYPE) {
        alert('Wrong Camera Type!. Setting Orbitting type by default');
        this.type = CAMERA_ORBITING_TYPE;
    }
}

Camera.prototype.goHome = function(home){
    if (home != null){
        this.home = home;
    }

    this.setPosition(this.home);
    this.setobserver(0);
    this.setElevation(0);
    this.steps = 0;
}

Camera.prototype.dolly = function(steps){
    var camera   = this;
    var position = vec3.create();
    var normal   = vec3.create();

    position = camera.position;
    var step = steps - c.steps;

    vec3.normalize(camera.normal,normal);

    var newPosition = vec3.create();

    if(camera.type == CAMERA_TRACKING_TYPE){
        newPosition[0] = position[0] - step*normal[0];
        newPosition[1] = position[1] - step*normal[1];
        newPosition[2] = position[2] - step*normal[2];
    }
    else{
        newPosition[0] = position[0];
        newPosition[1] = position[1];
        newPosition[2] = position[2] - step;
    }

    camera.setPosition(newPosition);
    camera.steps = step;
}

Camera.prototype.setPosition = function(position){
    vec3.set(position, this.position);
    this.update();
}

//Align the normal to the focus vector
Camera.prototype.setFocus = function(focus){
	vec3.set(focus, this.focus);
	this.update();
}

Camera.prototype.setObserver = function(observer){
    this.changeObserver(observer - this.observer);
}

Camera.prototype.changeObserver = function(observer){
    var camera = this;
    camera.observer += observer;

    if (camera.observer > 360 || camera.observer <-360) {
		camera.observer = camera.observer % 360;
	}
    camera.update();
}

Camera.prototype.setElevation = function(ellevation){
    this.changeElevation(elevation - this.elevation);
}

Camera.prototype.changeElevation = function(elevation){
    var ccamera = this;

    camera.elevation += elevation;

    if (camera.elevation > 360 || camera.elevation <-360) {
		camera.elevation = camera.elevation % 360;
	}
    camera.update();
}

Camera.prototype.calculateOrientation = function(){
	var matrix = this.matrix;
    mat4.multiplyVec4(matrix, [1, 0, 0, 0], this.right);
    mat4.multiplyVec4(matrix, [0, 1, 0, 0], this.up);
    mat4.multiplyVec4(matrix, [0, 0, 1, 0], this.normal);
}

Camera.prototype.update = function(){
	mat4.identity(this.matrix);

	this.calculateOrientation();

    if (this.type == CAMERA_TRACKING_TYPE){
        mat4.translate(this.matrix, this.position);
        mat4.rotateY(this.matrix, this.observer * Math.PI/180);
        mat4.rotateX(this.matrix, this.elevation * Math.PI/180);
    }
    else {
        var trxLook = mat4.create();
        mat4.rotateY(this.matrix, this.observer * Math.PI/180);
        mat4.rotateX(this.matrix, this.elevation * Math.PI/180);
        mat4.translate(this.matrix,this.position);
    }

    this.calculateOrientation();

    if(this.type == CAMERA_TRACKING_TYPE){
        mat4.multiplyVec4(this.matrix, [0, 0, 0, 1], this.position);
    }

    if(this.hookRenderer){
        this.hookRenderer();
    }
    if(this.hookGUIUpdate){
        this.hookGUIUpdate();
    }
};

Camera.prototype.getViewTransform = function(){
    var matrix = mat4.create();
    mat4.inverse(this.matrix, matrix);
    return matrix;
};
