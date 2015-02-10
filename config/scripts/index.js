//events
Spider.startWeb('canvas', 200, 200);
document.getElementById('changeColor').addEventListener('change', function(event) {
  Spider.changeColor(Spider.hex2rgb(this.value,1));
});
