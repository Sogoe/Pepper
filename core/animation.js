/**
 * Created by sony on 2015/7/2.
 */
var Animation = function(sprite, behavior, duration, delay, timingFunction, iterationCount) {
    this.sprite = sprite;
    this.pepper = this.sprite.pepper;
    this.behavior = behavior;
    this.startTime = 0;
    this.endTime = 0;
    this.duration = duration || 0;
    this.delay = delay || 0;
    this.timingFunction = timingFunction || "linear";
    this.iterationCount = iterationCount || 1;
};

Animation.prototype = {
    animate: function(time) {
        if(time < this.startTime || time > this.endTime)
            return;
        this.behavior.execute(this.pepper, this.sprite, time, timingRatio);
    },
    start: function() {
        var now = (+new Date());
        this.startTime = now + this.delay;
        this.endTime = now + this.delay + this.duration;
    }
};

var TranslateAnimation = function(sprite, x, y, duration, delay, timingFunction, iterationCount) {
    var TranslateExecute = function(sprite, x, y, duration, timingFunction) {
        sprite.velocityX = (x - sprite.x) * 1000 / duration;
        sprite.velocityY = (y - sprite.y) * 1000 / duration;
    };

    TranslateExecute.prototype = {
        execute: function(pepper, sprite, time) {
            var elapsedTime = time - pepper.getLastTime();
            sprite.x += sprite.velocityX * (elapsedTime / 1000);
            sprite.y += sprite.velocityY * (elapsedTime / 1000);
        }
    };

    return new Animation(sprite, new TranslateExecute(sprite, x, y, duration, timingFunction),
        duration, delay,timingFunction, iterationCount);
};