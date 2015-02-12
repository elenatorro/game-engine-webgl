// -- Dependencies ------------------------------------------------------
var should = require("should");
var NodeTree = require("../lib/NodeTree")

// -- Tests -------------------------------------------------------------

describe('Default Test: ', function() {
  describe('Group 2', function() {
    it('should return -1 when the value is not present', function(){
      var treeNode = new NodeTree(null, 'father', 0, []);
      treeNode.father().should.eql('father');
    })
  })
})
