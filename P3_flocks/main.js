const WIDTH = 800;
const HEIGHT = 600;
const VEL = 2.5;
const TWO_PI = 3.14*2;
const AMOUNT = 80;
const VIEW_RADIUS = 100;
const VIEW_ANGLE = 3.14 * 0.5;

let birds = [];
// let bird1;
// let bird2;
function setup() {
    createCanvas(WIDTH, HEIGHT);
    strokeWeight(1);
    frameRate(60);
    for (i = 0; i<AMOUNT; i++) {
        let vel = getRandomVector();
        let bird = new Bird(random(0, WIDTH), random(0, HEIGHT),
                            vel.x, vel.y);
        birds.push(bird);
    }
    // bird1 = birds[0];
    // bird2 = birds[1];
}

function draw() {
    background(240);

    birds.forEach( bird1 => {
        let closestBird = undefined;
        let closestDist = VIEW_RADIUS * 10;
        birds.forEach( bird2 => {
            if (bird1 === bird2) {
                return;
            }
            let distanceTo = bird1.getDistanceTo(bird2);
            if (distanceTo < VIEW_RADIUS &&
                distanceTo < closestDist &&
               inViewAngle(bird1, bird2) ) {
               closestDist = distanceTo;
               closestBird = bird2;
           }
        });
        if (closestBird) {
            bird1.turnAway(closestBird);
        }
    });

    birds.forEach(bird => {
        bird.move();
        bird.show();
    });
    // noFill();
    // circle(bird1.position.x, bird1.position.y, VIEW_RADIUS);

}

function getRandomVector() {
    return p5.Vector.fromAngle(random(0, TWO_PI), VEL);
}

function inViewAngle(bird1, bird2) {
    return Math.abs(bird1.getViewAngle(bird2)) < VIEW_ANGLE;
}
