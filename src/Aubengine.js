var WEBGLAPP_RENDER      = undefined;
var WEBGLAPP_TIMER_ID    = -1;
var WEBGLAPP_RENDER_RATE = 16;

function Aubengine(canvas, tree) {
    this.interactor = null; //the camera interactor
    this.transforms = null; //object transformations
    this.tree       = new Tree();

    gl = Configuration.getGLContext(canvas); //clobal context

    this.canvas = canvas;
}

Aubengine.prototype.getTree = function() {
  return this.tree;
};

Aubengine.prototype.getRoot = function() {
  return this.tree.getRoot();
};

Aubengine.prototype.setUpEnvironment = function () {
  gl.clearColor(56/255,161/255,172/255, 1.0);
  gl.clearDepth(1.0);

  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
}

Aubengine.prototype.createCamera = function(alias, home, focus, azimuth, elevation) {
  var    camera = new Camera(alias, CAMERA_ORBITING_TYPE, home, focus, azimuth, elevation);
  return camera;
};

Aubengine.prototype.setMainCamera = function(camera) {
  camera.draw(); //provisional
  this.interactor = new CameraInteractor(camera, this.canvas);
  this.transforms = new SceneTransforms(camera);
  this.transforms.init();       //global transforms
  interactor = this.interactor; //global interactor
}

Aubengine.prototype.loadProgram = function(translateLights) {
  Program.load();

  //lights uniform vector, uses PHONG
  gl.uniform3fv(Program.uLightPosition, Lights.getArray('position'));
  gl.uniform3fv(Program.uLa, Lights.getArray('ambient'));
  gl.uniform3fv(Program.uLd, Lights.getArray('diffuse'));
  gl.uniform3fv(Program.uLs, Lights.getArray('specular'));

  //object properties uniform vector
  gl.uniform3fv(Program.uKa, [1.0,1.0,1.0]);
  gl.uniform3fv(Program.uKd, [1.0,1.0,1.0]);
  gl.uniform3fv(Program.uKs, [1.0,1.0,1.0]);

  gl.uniform1f(Program.uNs, 1.0);
  gl.uniform1i(Program.uTranslateLights, translateLights || false);
}

Aubengine.prototype.createMesh = function(filename, alias) {
  var mesh = new Mesh(filename, alias);
  return mesh;
};

Aubengine.prototype.addModel = function(filename, alias, attributes, callback) {
  Scene.loadObject(filename,alias,attributes,callback); //drawing
};

Aubengine.prototype.addFloor = function(visible) {
  Floor.build(80,2);
  Floor.Ka = [1,1,1];
  Floor.Kd = [0.6,0.6,0.6]
  Floor.Ks = [1,1,1];
  Floor.Ni = 1;
  Floor.Ns = 1;
  Floor.d = 1.0;
  Floor.illum = 1;
  Floor.visible = visible;
};

Aubengine.prototype.createLight = function(name, position, diffuse, ambient, specular) {
      if ((name == null) || (position == null) || (diffuse == null) || (ambient == null) || (specular == null)) {
        alert('Light can not be created! Wrong parameters.');
      } else {
        var light = new Light(name);
        light.setPosition(position);
        light.setDiffuse(diffuse);
        light.setAmbient(ambient);
        light.setSpecular(specular);
        //Lights.add(light);
      }

      return light;
};

Aubengine.prototype.addNode = function(father, node) {
  father.addChild(node);
};

Aubengine.prototype.createNode = function(entity) {
  var node = new NodeTree(entity);
  return node;
};
//needs to be refactored
Aubengine.prototype.draw = function() {
  this.loadProgram(false);
  gl.viewport(0, 0, c_width, c_height);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  this.transforms.updatePerspective();

  try{
      for (var i = 0; i < Scene.objects.length; i++){

          var object = Scene.objects[i];
    if (object.visible != undefined && !object.visible) continue;
    this.transforms.calculateModelView();
    this.transforms.push();
    if (object.alias == 'cube') {
      var cube  = this.transforms.mvMatrix;
      mat4.translate(cube,[1,1,0]);
    }

    this.transforms.setMatrixUniforms();
    this.transforms.pop();
          gl.enableVertexAttribArray(Program.aVertexPosition);
          gl.disableVertexAttribArray(Program.aVertexNormal);
          gl.disableVertexAttribArray(Program.aVertexColor);

          gl.uniform1i(Program.uWireframe, false);
          gl.uniform3fv(Program.uKa, object.Ka);
          gl.uniform3fv(Program.uKd, object.Kd);
          gl.uniform3fv(Program.uKs, object.Ks);
          gl.uniform1f(Program.uNs, object.Ns);
          gl.uniform1f(Program.d, object.d);
          gl.uniform1i(Program.illum, object.illum);

         if(object.d < 1.0){  //tweaking parameters here
               gl.uniform1f(Program.d, 0.14);
              }


          gl.bindBuffer(gl.ARRAY_BUFFER, object.vbo);
          gl.vertexAttribPointer(Program.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
          gl.enableVertexAttribArray(Program.aVertexPosition);

    if(!object.wireframe){
      gl.bindBuffer(gl.ARRAY_BUFFER, object.nbo);
      gl.vertexAttribPointer(Program.aVertexNormal, 3, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(Program.aVertexNormal);
          }
          else{
              gl.uniform1i(Program.uWireframe, true);
          }

          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, object.ibo);

    if (object.wireframe){
              gl.drawElements(gl.LINES, object.indices.length, gl.UNSIGNED_SHORT,0);
          }
          else{
              gl.drawElements(gl.TRIANGLES, object.indices.length, gl.UNSIGNED_SHORT,0);
          }

          gl.bindBuffer(gl.ARRAY_BUFFER, null);
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

      } //end for
  }
  catch(err){
      alert(err);
      console.error(err.description);
  }
}

Aubengine.prototype.start = function() {
        WEBGLAPP_RENDER = this.draw;
        renderLoop();
 }

Aubengine.prototype.refresh = function(){
    if (WEBGLAPP_RENDER) WEBGLAPP_RENDER(false);
 }

renderLoop = function(){
     WEBGLAPP_TIMER_ID = setInterval(WEBGLAPP_RENDER, WEBGLAPP_RENDER_RATE);
}

window.onblur = function(){
    clearInterval(WEBGLAPP_TIMER_ID);
    console.info('Rendering stopped');
}

window.onfocus = function(){
    renderLoop();
    console.info('Rendering resumed');
}
