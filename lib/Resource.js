'use strict';

function Resource(name, data) {
    this.name = name;
    this.data = data || '';
  };

  Resource.prototype.setName = function(name) {
    this.name = name;
  };

  Resource.prototype.getName = function() {
    return this.name;
  };
