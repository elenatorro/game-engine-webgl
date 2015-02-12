/* Mesh */
// -- Object ------------------------------------------------------
var Mesh, exports;
Mesh = (function(attributes) {
  function Mesh(attributes) {
    this.attributes = attributes;
    this.prototype  = new Entity();
  }

Mesh.prototype = {
  constructor : Mesh,
  loadMesh    : function(file) {}
}

return Mesh;
})();

// -- Export ------------------------------------------------------
exports = module.exports = Mesh;
