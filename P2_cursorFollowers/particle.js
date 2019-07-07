const MAX_LENGTH = 30;
const MAX_MAGNITUTE = 5;

class Particle {

    constructor(xPos, yPos, xVel, yVel) {
        this.position = createVector(xPos, yPos);
        this.velocity = createVector(xVel, yVel);
        this.trail = [];
    }

    accelerate(force) {
        this.velocity.add(force);
        if (this.velocity.mag() > MAX_MAGNITUTE) {
            this.velocity.setMag(MAX_MAGNITUTE);
        }
    }

    show() {
        let length = this.trail.length;
        if (length < 2) {
            return;
        }
        let previousParticle = this.trail[0];
        for (let i = 1; i < length; i++) {
            stroke(0, 0, 200, map(i, 1, length-1, 255, 1));
            let currentParticle = this.trail[i];
            line(previousParticle.x, previousParticle.y, currentParticle.x, currentParticle.y);
            previousParticle = currentParticle;
        }
    }

    move() {
        if (this.trail.unshift(createVector(this.position.x, this.position.y)) > MAX_LENGTH){
            this.trail.pop();
        }
        this.position.add(this.velocity);
        if (this.position.x > WIDTH) {
            this.position.add(2*(WIDTH - this.position.x), 0);
            this.velocity = createVector(-this.velocity.x, this.velocity.y);
            this.velocity.mult(BOUNCE_CEOF);
        } else if (this.position.x < 0) {
            this.position.add(2*(-this.position.x), 0);
            this.velocity = createVector(-this.velocity.x, this.velocity.y);
            this.velocity.mult(BOUNCE_CEOF);
        }
        if (this.position.y > HEIGHT) {
            this.position.add(0, 2*(HEIGHT - this.position.y));
            this.velocity = createVector(this.velocity.x, -this.velocity.y);
            this.velocity.mult(BOUNCE_CEOF);
        } else if (this.position.y < 0) {
            this.position.add(0, 2*(-this.position.y));
            this.velocity = createVector(this.velocity.x, -this.velocity.y);
            this.velocity.mult(BOUNCE_CEOF);
        }
    }

}