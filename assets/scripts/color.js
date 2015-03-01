var aubengine  = new Aubengine(200, 200, 'canvas');
aubengine.startWeb('canvas', 200, 200);
document.getElementById('changeColor').addEventListener('change', function(event) {
  aubengine.changeColor(aubengine.color.hex2rgb(this.value,1));
});
