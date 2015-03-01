'use strict';

function Color(hex) {
    this.hex  = hex || '#FFFFFF';
    this.rgba = this.hex2rgb(this.hex, 1);
    this.vec  = null;
  }

  Color.prototype.hex2rgb = function(hex, opacity) {
    var hexStr = hex.replace('#','');
    var r = parseInt(hexStr.substring(0,2), 16);
    var g = parseInt(hexStr.substring(2,4), 16);
    var b = parseInt(hexStr.substring(4,6), 16);
    return [r/255,g/255,b/255,opacity];
  };

  Color.prototype.rgb2hex = function(rgb) {
   return "#" +
    ("0" + parseInt(rgb[0],10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[2],10).toString(16)).slice(-2);
  }

  Color.prototype.setColorRgba = function(r,g,b,a) {
    this.rgba     = [r,g,b, a || 1];
    this.hex      = this.rgb2hex(this.rgba);
    this.vec      = vec4(r,g,b,a);
  }

  Color.prototype.setColorHex = function(hex, opacity) {
    this.hex      = hex;
    this.rgba     = this.rgba(hex, opacity || 1);
    this.vec      = vec4(this.rgba[0],this.rgba[1],this.rgba[2],this.rgba[3]);
  }

  Color.prototype.getHex  = function() {
    return this.hex;
  };

  Color.prototype.getRgba = function() {
    return this.rgba;
  };

  Color.prototype.getVec  = function() {
    return this.vec;
  };
