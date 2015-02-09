var Bug = {
  /*There are two kind of WebGL buffers used to describe and process geometry:
  Buffers that contain vertex data are known as Vertex Buffer Objects (VBOs).
  Similarly, buffers that contain index data are known as Index Buffer Objects
  (IBOs).*/
  vertices: [],
  indices:  []
}

var Spider = {
  //__privated variables
  gl      : null,
  width   : 800,
  height  : 800,
  glNames : ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"],

  //__functions
  startWeb: function(canvasId, width, height) {
    var canvas = document.getElementById(canvasId);
    Spider.width = width;
    Spider.height = height;
    var i = 0;
    // Spider.gl = canvas.getContext('webgl');
    while ((Spider.gl == null) && (i < Spider.glNames.length)) {
      try {
          Spider.gl = canvas.getContext(Spider.glNames[i]);
        } catch (e) {
          console.log(e)
        };
        i++;
    }
  },

  isStarted: function() {
    if (Spider.gl == null) return false;
    else return true;
  },

  clear: function() {
    if (Spider.isStarted()) {
      Spider.gl.clear(Spider.gl.COLOR_BUFFER_BIT);
      Spider.gl.viewport(0, 0, Spider.width, Spider.height);
    }
  },

  changeColor: function(color) {
    if (Spider.isStarted()) {
      Spider.gl.clearColor(color[0], color[1], color[2], color[3]);
      Spider.clear(Spider.gl);
    }
  },

  hex2rgb: function(hex, opacity) {
      hex = hex.replace('#','');
      r = parseInt(hex.substring(0,2), 16);
      g = parseInt(hex.substring(2,4), 16);
      b = parseInt(hex.substring(4,6), 16);
      return [r/255,g/255,b/255,opacity];
    }
};
