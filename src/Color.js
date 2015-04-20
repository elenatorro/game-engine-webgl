'use strict';

var Color = {
  hex2rgb: function(hex, opacity) {
    var hexStr = hex.replace('#','');
    var r = parseInt(hexStr.substring(0,2), 16);
    var g = parseInt(hexStr.substring(2,4), 16);
    var b = parseInt(hexStr.substring(4,6), 16);
    return [r/255,g/255,b/255,opacity];
  },

  rgb2hex: function(rgb) {
    return "#" +
     ("0" + parseInt(rgb[0],10).toString(16)).slice(-2) +
     ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
     ("0" + parseInt(rgb[2],10).toString(16)).slice(-2);
  },

  rgb2decimal: function(r,g,b) {
    return [r/255, g/255, b/255];

  }
}
