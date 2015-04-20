'use strict';

function Animation(frequency, times, callback, data, callbackObj) {
  this.frequency   = frequency;
  this.interval    = null;
  if (callbackObj) {
    this.callbackObj     = callbackObj;
    callbackObj.callback = callback;
  } else {
    this.callbackObj = {callback: callback}
  }
  var count = 0;
  var eTime;
  var self = this;
  
  this.onFrame = function() {
    var stopAnimation = function() {
      clearInterval(self.interval);
    };

    eTime = (new Date).getTime() - self.iTime;
    if (eTime < 5) return;
    var steps = Math.floor(eTime / frequency);
    while ((steps > 0) && (count != times)) {
      self.callbackObj.callback(data);
      steps -= 1;
      count++;
    };

    if (count == times) {
        stopAnimation();
    };

    self.iTime = (new Date).getTime();
  };

  this.startAnimation = function() {
    self.iTime = (new Date).getTime();
    self.interval = setInterval(self.onFrame, self.frequency/1000);
  };
};
