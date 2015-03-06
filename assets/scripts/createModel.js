var aubengine  = new Aubengine(200, 200, 'canvas');
aubengine.startWeb();
document.getElementById('loadModel').addEventListener('click', function(event) {
  var chair = aubengine.addMesh();
  aubengine.loadMesh(chair, '../assets/scripts/models/cube.obj');
  aubengine.addNode(aubengine.getRoot(), chair);

});

document.getElementById('draw').addEventListener('click', function(event) {
  aubengine.draw();
})
