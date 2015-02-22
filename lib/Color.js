'use strict';

var Color, exports;

Color = (function() {
  function Color(attributes) {
    this.attributes = attributes;
  }

  Color.prototype.hex2rgb = function(hex, opacity) {
    hex = hex.replace('#','');
    var r = parseInt(hex.substring(0,2), 16);
    var g = parseInt(hex.substring(2,4), 16);
    var b = parseInt(hex.substring(4,6), 16);
    return [r/255,g/255,b/255,opacity];
  };

  return Color;
})();

exports = module.exports = Color;
