const WIDTH = 600;
const HEIGHT = 600;
const BOUNCE_CEOF = 0.95;
const AMOUNT = 50;

let particle;
let particles = [];

function setup() {
    createCanvas(WIDTH, HEIGHT);
    strokeWeight(1);
    particles = createParticleFan(createVector(450,300), createVector(1.5, -6),
        toRadians(10));
    particle = new Particle(0, 0, 0, 0);
    frameRate(40);
}

function draw() {
    background(240);

    let force = createVector(mouseX - particle.position.x, mouseY - particle.position.y)
        .normalize();
    particle.accelerate(force);
    particle.move();
    particle.show();
}

function createParticleFan(position, vector, angle) {
    const particles = [];
    for(let i=0; i < AMOUNT; i++) {
        const particleVector = vector.copy().rotate(map(i, 0, AMOUNT-1, -angle, angle));
        particles.push(new Particle(position.x, position.y, particleVector.x, particleVector.y));
    }
    return particles;
}