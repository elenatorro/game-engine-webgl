'use strict';

function ResourceManager(path) {
    this.resources = [];
    this.path      = path || '';
    this.file      = require("fs");
  }

ResourceManager.prototype.getResource = function(name) {
  var resource = this.searchResource(name);
  if (!resource) {
    resource = new Resource(name, '');
    this.writeResource(resource);
  }
  return resource;
};

ResourceManager.prototype.writeResource = function(resource) {
  this.file.appendFileSync(this.path, resource.name + '#' + resource.data + '\n');
}

ResourceManager.prototype.readName = function(line) {
  return line.split('#')[0];
}

ResourceManager.prototype.readData = function(line) {
  return line.split('#')[1];
}

ResourceManager.prototype.getFileText = function(path) {
  console.log(this.file);
  this.path = path;
  return this.file.readFileSync(this.path).toString();
};

ResourceManager.prototype.getFileContent = function() {
  return this.file.readFileSync(this.path).toString().split('\n');
}

ResourceManager.prototype.searchResource = function(name) {
  var fileContent = this.getFileContent();
  var i = 0;
  while ( i < fileContent.length) {
    if (this.readName(fileContent[i]) == name) return fileContent[i];
    i++;
  }
  return false;
}

ResourceManager.prototype.addResource = function(resource) {
  this.resources.push(resource);
}

ResourceManager.prototype.getFile = function() {
  return this.file;
}

ResourceManager.prototype.setPath = function(path) {
  this.path = path;
}

ResourceManager.prototype.getPath = function(path) {
  return this.path;
}

ResourceManager.prototype.readAllResources = function() {
  var resource = null;
  this.getFileContent().forEach(function (line) {
    resource = new Resource(this.readName(line), this.readData(line));
    this.resources.push(resource);
  })
};
