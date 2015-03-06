
function SceneTransforms(c){
	this.stack = [];
	this.camera = c;
	this.mvMatrix    = mat4.create();    // modelview
	this.pMatrix     = mat4.create();    // projection
	this.nMatrix     = mat4.create();    // normal
};


SceneTransforms.prototype.calculateModelView = function(){
	this.mvMatrix = this.camera.getViewTransform();
};

SceneTransforms.prototype.calculateNormal = function(){
    mat4.identity(this.nMatrix);
    mat4.set(this.mvMatrix, this.nMatrix);
    mat4.inverse(this.nMatrix);
    mat4.transpose(this.nMatrix);
};

SceneTransforms.prototype.calculatePerspective = function(){
    mat4.identity(this.pMatrix);
    mat4.perspective(30, c_width / c_height, 0.1, 1000.0, this.pMatrix);
};


SceneTransforms.prototype.init = function(){
    this.calculateModelView();
    this.calculatePerspective();
    this.calculateNormal();
};


//resize screen
SceneTransforms.prototype.updatePerspective = function(){
    mat4.perspective(30, c_width / c_height, 0.1, 1000.0, this.pMatrix);
};


/**
* Maps the matrices to shader matrix uniforms
*
* Called once per rendering cycle.
*/


SceneTransforms.prototype.setMatrixUniforms = function(){
	this.calculateNormal();
    gl.uniformMatrix4fv(Program.uMVMatrix, false, this.mvMatrix);
    gl.uniformMatrix4fv(Program.uPMatrix, false, this.pMatrix);
    gl.uniformMatrix4fv(Program.uNMatrix, false, this.nMatrix);
};


SceneTransforms.prototype.push = function(){
	var memento =  mat4.create();
	mat4.set(this.mvMatrix, memento);
	this.stack.push(memento);
};

SceneTransforms.prototype.pop = function(){
	if(this.stack.length == 0) return;
	this.mvMatrix  =  this.stack.pop();
};
