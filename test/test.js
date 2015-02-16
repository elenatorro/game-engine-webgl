var should   = require("should");
var NodeTree = require("../lib/NodeTree")
var Tree     = require("../lib/Tree")

var root = new NodeTree(null, '', []);

describe('Testing Nodes: ', function() {
  describe('Root element', function() {
    it('Should create a new node', function(){
      root.getFather().should.eql('');
    }),

    it('Is Root?', function() {
      root.isRoot().should.be.true;
    })
  }),

  describe('Seed tree', function() {
    var node = '';
    for (var i = 0; i < 10; i++) {
      node = new NodeTree(i, root, []);
      root.addChild(node);
    };
    it('Children Number', function(){
      root.childrenNumber().should.eql(10);
    }),

    it('Child exists', function() {
      root.existsChild(root.getChild(0)).should.be.true;
    }),

    it('Get child', function() {
      root.getChild(0).should.eql(root.children[0]);
    }),

    it('Get sibling', function() {
      root.firstChild().nextSibling().should.eql(root.getChild(1));
    }),

    it('Remove child', function() {
      root.removeChild(root.firstChild());
      root.childrenNumber().should.eql(9);
    })
  })
})

describe('Testing Tree: ', function() {
  describe('Tree element', function() {
    var root = new NodeTree(null, '', []);
    var tree = new Tree(root);
    var node = '';
    var i, j, k = 0;
    for (i; i < 10; i++) {
      node = new NodeTree(i, root, []);
      tree.getRoot().addChild(node);
    };
    it('Preorder', function() {
      console.log(tree);
    })
  })
})
