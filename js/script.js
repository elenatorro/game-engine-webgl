var aubengine;

function runShowRoom() {
  aubengine = new Aubengine("the-canvas");
  aubengine.setUpEnvironment();
  //create main camera
  var camera = aubengine.createCamera('main',[0.0,0.2,7],[0.0,0.0,0.0], 10,-11);
  //create main four lights
  var light1Pos = [-25,25,-25];
  var light2Pos = [ 25,25,-25];
  var light3Pos = [ -25,25,-25];
  var light4Pos = [ -25,-25,25];

  var light1Transform = aubengine.createTransformation('light1Trans', light1Pos);
  var light2Transform = aubengine.createTransformation('light2Trans', light2Pos);
  var light3Transform = aubengine.createTransformation('light2Trans', light3Pos);
  var light4Transform = aubengine.createTransformation('light2Trans', light4Pos);

  var spherePos  = [1,1,0];
  var sphereSize = [1.5, 1.5, 1.5];
  var sphereTransform = aubengine.createTransformation('sphereTrans', spherePos, sphereSize);

  var cubePos = [0,-1,0];
  var cubeSize = [1,1,1];
  var cubeTransform = aubengine.createTransformation('cubeTrans', cubePos, cubeSize);

  var fleft  = aubengine.createLight('fleft',  [0.4,0.4,0.4],[0.0,0.0,0.0],[0.8,0.8,0.8]);
  var fright = aubengine.createLight('fright', [0.4,0.4,0.4],[0.0,0.0,0.0],[0.8,0.8,0.8]);
  var nleft  = aubengine.createLight('nleft',  [0.4,0.4,0.4],[0.0,0.0,0.0],[0.8,0.8,0.8]);
  var nright = aubengine.createLight('nright', [0.4,0.4,0.4],[0.0,0.0,0.0],[0.8,0.8,0.8]);

  //create some meshes
  var cube  = aubengine.createMesh('models/simpleCube.json', 'cube');
  // cube.setPosition([1,1,0]);
  // cube.setSize([1.5, 1.5, 1.5]);
  cube.setSpecularColor(255, 123, 19);

  var sphere = aubengine.createMesh('models/sphere.json', 'sphere');
  // sphere.setPosition([0,-1,1]);
  // sphere.setSize([1,1,1]);
  sphere.setSpecularColor(40, 255, 255);

  // var chair = aubengine.createMesh('models/chair.json', 'chair');
  // // chair.setPosition([-2,-1,-2]);
  // // chair.setSize([0.3,0.3,0.3]);
  // chair.setSpecularColor(255, 30, 120);
  //
  // var cone = aubengine.createMesh('models/cone.json', 'cone');
  // // cone.setPosition([0,0,1]);
  // // cone.setSize([0.2,0.2,0.2]);
  // cone.setSpecularColor(160, 255, 20);

  //scene tree
  var cameraNode = aubengine.createNode(camera);
  aubengine.addNode(aubengine.getRoot(), cameraNode);

  //light1
  var transform1 = aubengine.createNode(light1Transform);
  aubengine.addNode(aubengine.getRoot(), transform1);
  var fleftNode = aubengine.createNode(fleft);
  aubengine.addNode(transform1, fleftNode);

  //light2
  var transform2 = aubengine.createNode(light2Transform);
  aubengine.addNode(aubengine.getRoot(), transform2);
  var frightNode = aubengine.createNode(fright);
  aubengine.addNode(transform2, frightNode);

  //light3
  var transform3 = aubengine.createNode(light3Transform);
  aubengine.addNode(aubengine.getRoot(), transform3);
  var nleftNode = aubengine.createNode(nleft);
  aubengine.addNode(transform3, nleftNode);

  //light4
  var transform4 = aubengine.createNode(light4Transform);
  aubengine.addNode(aubengine.getRoot(), transform4);
  var nrightNode = aubengine.createNode(nright);
  aubengine.addNode(transform4, nrightNode);


  //mesh1
  var transform5 = aubengine.createNode(sphereTransform);
  aubengine.addNode(aubengine.getRoot(), transform5);
  var meshNode = aubengine.createNode(sphere);
  aubengine.addNode(transform5, meshNode);

  //mesh2
  var transform6 = aubengine.createNode(cubeTransform);
  aubengine.addNode(aubengine.getRoot(), transform6);
  var meshNode2 = aubengine.createNode(cube);
  aubengine.addNode(transform6, meshNode2);

  // var meshNode3 = aubengine.createNode(chair);
  // aubengine.addNode(meshNode, meshNode3);
  //
  // var meshNode4 = aubengine.createNode(cone);
  // aubengine.addNode(aubengine.getRoot(), meshNode4);

  aubengine.getTree().saveEntities(aubengine);

  aubengine.setMainCamera(camera);


  document.getElementById('rangeShine').addEventListener('change', function(event) {
    var specular = document.getElementById("rangeShine").value;
    meshNode2.getEntity().setSpecular(specular);
    console.log(meshNode2);
    aubengine.draw();
  })
};
