'use strict';

function Animation(frequency, scene, times, callback, data) {
  this.scene = scene;
  this.frequency = frequency;
  this.interval = null;
  this.callback = callback;
  var stopAnimation = this.stopAnimation;
  var count = 0;
  var iTime = (new Date).getTime() + 1000;
  var eTime;

  this.onFrame = function() {
    eTime = (new Date).getTime() - iTime;
      if (eTime < 5) return;
      var steps = Math.floor(eTime / frequency);
      while(steps > 0) {
          if (callback) {
              if (count == times) break;
              count++;
            callback(data);
          } else {
            scene.draw();
          }
          steps -= 1;
      };
      if (count == times) stopAnimation();
    iTime = (new Date).getTime();
  };
};

Animation.prototype.startAnimation = function() {
  this.iTime = (new Date).getTime();
  var self = this;
	this.interval = setInterval(self.onFrame, self.frequency/1000);
};

Animation.prototype.stopAnimation = function() {
  clearInterval(this.interval);
};
