var CAMERA_ORBITING_TYPE = 1;
var CAMERA_TRACKING_TYPE = 2;

function Camera(alias, t, tFocus, tAzimuth, tElevation) {
    //default parameters
    this.alias      = alias;
    this.matrix     = mat4.create();
    this.up         = vec3.create();
    this.right      = vec3.create();
    this.normal     = vec3.create();
    this.position   = vec3.create();
    this.focus      = vec3.create();
    this.azimuth    = 0.0;
    this.elevation  = 0.0;
    this.type       = t;
    this.steps      = 0;
    this.home       = vec3.create();

    //update in drawing
    // this.tHome      = tHome;
    this.tHome      = vec3.create();
    this.tFocus     = tFocus;
    this.tAzimuth   = tAzimuth;
    this.tElevation = tElevation;
}

Camera.prototype.isMain = function() {
  return this.main;
};

Camera.prototype.setType = function(t) {

    this.type = t;

    if (t != CAMERA_ORBITING_TYPE && t != CAMERA_TRACKING_TYPE) {
        alert('Wrong Camera Type!. Setting Orbitting type by default');
        this.type = CAMERA_ORBITING_TYPE;
    }
};

Camera.prototype.getAlias = function() {
  return this.alias;
};

Camera.prototype.goHome = function(h) {
    if (h != null){
        this.home = h;
    }

    this.setPosition(this.home);
    this.setAzimuth(0);
    this.setElevation(0);
    this.steps = 0;
}

Camera.prototype.dolly = function(s){
    var c = this;

    var p =  vec3.create();
    var n = vec3.create();

    p = c.position;

    var step = s - c.steps;

    vec3.normalize(c.normal,n);

    var newPosition = vec3.create();

    if(c.type == CAMERA_TRACKING_TYPE){
        newPosition[0] = p[0] - step*n[0];
        newPosition[1] = p[1] - step*n[1];
        newPosition[2] = p[2] - step*n[2];
    }
    else{
        newPosition[0] = p[0];
        newPosition[1] = p[1];
        newPosition[2] = p[2] - step;
    }

    c.setPosition(newPosition);
    c.steps = s;
}

Camera.prototype.setHome = function(home) {
  vec3.set(home, this.tHome);
};

Camera.prototype.setPosition = function(p){
    vec3.set(p, this.position);
    vec3.set(p, this.tHome);
    this.update();
}

Camera.prototype.setFocus = function(f){
	vec3.set(f, this.focus);
	this.update();
}

Camera.prototype.setAzimuth = function(az){
    this.changeAzimuth(az - this.azimuth);
}

Camera.prototype.changeAzimuth = function(az){
    var c = this;
    c.azimuth +=az;

    if (c.azimuth > 360 || c.azimuth <-360) {
		c.azimuth = c.azimuth % 360;
	}
    c.update();
}

Camera.prototype.setElevation = function(el) {
    this.changeElevation(el - this.elevation);
}

Camera.prototype.changeElevation = function(el) {
    var c = this;

    c.elevation +=el;

    if (c.elevation > 360 || c.elevation <-360) {
		c.elevation = c.elevation % 360;
	}
    c.update();
}

Camera.prototype.calculateOrientation = function(){
	var m = this.matrix;
    mat4.multiplyVec4(m, [1, 0, 0, 0], this.right);
    mat4.multiplyVec4(m, [0, 1, 0, 0], this.up);
    mat4.multiplyVec4(m, [0, 0, 1, 0], this.normal);
}

Camera.prototype.update = function() {
	mat4.identity(this.matrix);

	this.calculateOrientation();

    if (this.type == CAMERA_TRACKING_TYPE){
        mat4.translate(this.matrix, this.position);
        mat4.rotateY(this.matrix, this.azimuth * Math.PI/180);
        mat4.rotateX(this.matrix, this.elevation * Math.PI/180);
    }
    else {
        var trxLook = mat4.create();
        mat4.rotateY(this.matrix, this.azimuth * Math.PI/180);
        mat4.rotateX(this.matrix, this.elevation * Math.PI/180);
        mat4.translate(this.matrix,this.position);
    }

    this.calculateOrientation();

    if(this.type == CAMERA_TRACKING_TYPE){
        mat4.multiplyVec4(this.matrix, [0, 0, 0, 1], this.position);
    }
}

Camera.prototype.getViewTransform = function(){
    var m = mat4.create();
    mat4.inverse(this.matrix, m);
    return m;
};

//draws the main camera
Camera.prototype.draw = function() {
  this.goHome(this.tHome);
  this.setFocus(this.tFocus);
  this.setAzimuth(this.tAzimuth);
  this.setElevation(this.tElevation);
};

Camera.prototype.beginDraw = function() {
  transforms.push();
  this.draw();
};

Camera.prototype.endDraw = function() {
  transforms.pop();
  console.log('end of draw ' + this.alias);
};

var Cameras = {
  list : [],
  add : function(camera, position){
		if (!(camera instanceof Camera)){
			alert('the parameter is not a light');
			return;
		}
    camera.setPosition(position);
		this.list.push(camera);
	},

	getArray: function(type) {
		var a = [];
		for(var i = 0, max = this.list.length; i < max; i+=1){
			a = a.concat(this.list[i][type]);
		}
		return a;
	},

	get: function(idx){
		if ((typeof idx == 'number') && idx >= 0 && idx < this.list.length){
			return this.list[idx];
		}
		else if (typeof idx == 'string'){
			for(var i=0, max = this.list.length; i < max; i+=1){
				if (this.list[i].alias == idx) return this.list[i];
			}
			throw 'Camera ' + idx + ' does not exist';
		}
		else {
			throw 'Unknown parameter';
		}
	},

	getNumCameras: function() {
		if (this.list.length <= 0) return 1
		else return this.list.length
	}
}
