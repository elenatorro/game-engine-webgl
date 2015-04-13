var gl = null;
var prg = null;
var c_width = 0;
var c_height = 0;
var names    = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
var interactor = null;
var transforms = null;
var elapsedTime = undefined;
var initialTime = undefined;
var frequency = 5;

function resizeCanvas(aubengine){
    c_width = $('#content').width();
    c_height = $('#content').height();
    $('#the-canvas').attr('width',c_width);
    $('#the-canvas').attr('height',c_height);
    if (aubengine) aubengine.draw();
}

$(window).resize(function(){resizeCanvas();});
