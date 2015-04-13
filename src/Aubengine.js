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
    //drawing loop
    initialTime = undefined;
    elapsedTime = undefined;
    this.frequency = 5;

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
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

  this.loadProgram();
}

Aubengine.prototype.createCamera = function(alias, focus, azimuth, elevation) {
  var    camera = new Camera(alias, CAMERA_ORBITING_TYPE, focus, azimuth, elevation);
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

Aubengine.prototype.loadProgram = function() {
  Program.load();
}

Aubengine.prototype.createMesh = function(filename, alias, texture) {
  var mesh = new Mesh(filename, alias, texture);
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
        light.setDiffuse(diffuse);
        light.setAmbient(ambient);
        light.setSpecular(specular);
      };

      return light;
};

Aubengine.prototype.createTransformation = function(name, position, size, rotation) {
  var transformation = new Transformation(name, position, size, rotation);
  return transformation;
};

Aubengine.prototype.addNode = function(father, node) {
  father.addChild(node);
};

Aubengine.prototype.createNode = function(entity) {
  var node = new NodeTree(entity);
  return node;
};

Aubengine.prototype.draw = function() {
  var self = this;
  gl.viewport(0, 0, c_width, c_height);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  self.transforms.updatePerspective();
  self.getTree().draw(self.transforms);
};
