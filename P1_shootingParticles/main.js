const WIDTH = 600;
const HEIGHT = 600;
const BOUNCE_CEOF = 0.95;
const AMOUNT = 50;
const GRAVITY = 0.07;

let particles = [];

function setup() {
    createCanvas(WIDTH, HEIGHT);
    strokeWeight(1);
    particles = createParticleFan(createVector(450,300), createVector(2, -5), toRadians(10));
    frameRate(40);
}

function draw() {
    background(240);
    particles.forEach(particle => particle.move());
    particles.forEach(particle => particle.show());
}

function createParticleFan(position, vector, angle) {
    const particles = [];
    for(let i=0; i < AMOUNT; i++) {
        const particleVector = vector.copy().rotate(map(i, 0, AMOUNT-1, -angle, angle));
        particles.push(new Particle(position.x, position.y, particleVector.x, particleVector.y));
    }
    return particles;
}