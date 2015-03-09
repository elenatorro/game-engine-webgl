var WEBGLAPP_RENDER      = undefined;
var WEBGLAPP_TIMER_ID    = -1;
var WEBGLAPP_RENDER_RATE = 16;

function Aubengine(canvas, tree) {
    this.interactor = null; //the camera interactor
    this.transforms = null;
    this.tree       = new Tree();

    gl = Configuration.getGLContext(canvas); //clobal context

    this.camera = null;
    this.canvas = canvas;
}

Aubengine.prototype.getTree = function() {
  return this.tree;
};

Aubengine.prototype.getRoot = function() {
  return this.tree.getRoot();
};

Aubengine.prototype.getTransforms = function() {
  return this.transforms;
}

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
  this.camera     = camera;
  this.interactor = new CameraInteractor(camera, this.canvas);
  this.transforms = new SceneTransforms(camera);

  transforms = this.transforms;
  interactor = this.interactor;
  transforms.init();

};

Aubengine.prototype.loadProgram = function(translateLights) {
  Program.load();
}

Aubengine.prototype.createMesh = function(filename, alias) {
  var mesh = new Mesh(filename, alias);
  return mesh;
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

Aubengine.prototype.createLight = function(name, diffuse, ambient, specular) {
      if ((name == null) || (diffuse == null) || (ambient == null) || (specular == null)) {
        alert('Light can not be created! Wrong parameters.');
      } else {
        var light = new Light(name);
        // light.setPosition(position);
        light.setDiffuse(diffuse);
        light.setAmbient(ambient);
        light.setSpecular(specular);
      };

      return light;
};

Aubengine.prototype.createTransformation = function(name, position, size) {
  var transformation = new Transformation(name, position, size);
  return transformation;
};

Aubengine.prototype.addNode = function(father, node) {
  father.addChild(node);
};

Aubengine.prototype.createNode = function(entity) {
  var node = new NodeTree(entity);
  console.log(node);
  return node;
};


Aubengine.prototype.draw = function() {
  this.loadProgram(false);
  gl.viewport(0, 0, c_width, c_height);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  this.transforms.updatePerspective();
  //1. draw lights
  Lights.draw();

  //2. draw main camera
  this.camera.draw();

  //3. draw the rest of the tree
  this.tree.draw(this.transforms);
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
