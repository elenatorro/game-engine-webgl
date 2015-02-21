'use strict';

var Resource, exports;

Resource = (function() {
  function Resource(name, data) {
    this.name = name;
    this.data = data || '';
  }

  Resource.prototype.setName = function(name) {
    this.name = name;
  }

  Resource.prototype.getName = function() {
    return this.name;
  }

  return Resource;
})();

exports = module.exports = Resource;
