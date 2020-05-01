'use strict';

function Enemy(canvas, y, speed) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.size = 20;
  this.x = canvas.width + this.size;
  this.y = y;
  this.speed = speed;
}

Enemy.prototype.draw = function() {
    Enemy.prototype.draw = function() {
        this.ctx.fillStyle = '#FF6F27';
        // fillRect(x, y, width, height)
        this.ctx.fillRect(
          this.x,
          this.y,
          this.size,
          this.size,
        );
      };
};

Enemy.prototype.updatePosition = function() {
    Enemy.prototype.updatePosition = function() {
        this.x = this.x - this.speed;
      };
};

Enemy.prototype.isInsideScreen = function() {
    Enemy.prototype.isInsideScreen = function() {
        return this.x + this.size / 2 > 0;
      };
};