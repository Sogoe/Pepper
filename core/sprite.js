/**
 * Created by sony on 2015/7/2.
 */
var Sprite = function(pepper, name, painter) {
    if(name) this.name = name;
    if(painter) this.painter = painter;

    this.pepper = pepper;
    this.x = 0;
    this.y = 0;
    this.width = 32;
    this.height = 32;
    this.velocityX = 0;
    this.velocityY = 0;
    this.rVelocity = 0;
    this.visibility = true;
    this.animating = false;
};

Sprite.prototype = {
    paint: function(context) {
        if(this.painter !== undefined && this.visibility)  {
            this.painter.paint(this, context);
        }
    }
};

