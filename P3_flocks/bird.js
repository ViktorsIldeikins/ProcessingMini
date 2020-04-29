const TR_LNGTH = 10;
const PI = 3.14;
const HALF_PI = PI / 2;
const MAX_TURN_ANGLE = 5 * PI/180;

class Bird {

    constructor(xPos, yPos, xVel, yVel) {
        this.position = createVector(xPos, yPos);
        this.velocity = createVector(xVel, yVel);
    }

    show () {
        const vec = createVector(-this.velocity.x, -this.velocity.y);
        vec.setMag(TR_LNGTH);
        const trBase = this.position.copy();
        trBase.add(vec);
        vec.rotate(HALF_PI);
        vec.setMag(TR_LNGTH/2);
        const b = trBase.copy().add(vec);
        vec.rotate(PI);
        const c = trBase.copy().add(vec);
        triangle(this.position.x, this.position.y,
                b.x, b.y,
                c.x, c.y);
    }

    move() {
        this.position.add(this.velocity);
        if (this.position.x > WIDTH) {
            this.position.x -= WIDTH;
        }
        if (this.position.x < 0) {
            this.position.x += WIDTH;
        }
        if (this.position.y > HEIGHT) {
            this.position.y -= HEIGHT;
        }
        if (this.position.y < 0) {
            this.position.y += HEIGHT;
        }

    }

    turnAway(bird) {
        let dist = this.getDistanceTo(bird);
        if (dist < 10) {
            dist = 10;
        }
        const turnAngle = map(dist, 10, 100,
            MAX_TURN_ANGLE, 0 );
        if (this.getViewAngle(bird) < 0 ) {
            this.velocity.rotate(turnAngle);
        } else {
            this.velocity.rotate(-turnAngle);
        }
    }

    getDistanceTo(bird) {
        const dx = bird.position.x - this.position.x;
        const dy = bird.position.y - this.position.y;
        return Math.sqrt(dx*dx + dy*dy);
    }

    getViewAngle(bird) {
        let v = createVector(
            bird.position.x - this.position.x,
            bird.position.y - this.position.y);
        return this.velocity.angleBetween(v);
    }
}
