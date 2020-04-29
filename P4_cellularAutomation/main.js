const WIDTH = 600;
const HEIGHT = 600;
const DEAD = 0;
const ALIVE = 1;
let line = [];
// const RULE = [0, 0, 0, 0, 0, 0, 0, 1];
const RULE = [0, 1, 0, 1, 1, 0, 1, 0];
// const RULE = [0, 0, 0, 1, 1, 1, 1, 0];

function setup() {
    createCanvas(WIDTH, HEIGHT);
    for (i = 0; i <= WIDTH; i++) {
        if ( i === WIDTH / 2) {
            line.push(ALIVE);
        } else {
            line.push(DEAD);
        }
    }
    background(240);
    for (h = 100; h  < HEIGHT ; h++) {
        updatePixelLine(line, h);
        line = getNextLine(line);
    }
    updatePixels();
}

function draw() {

}

function updatePixelLine(line, height) {
    for (i = 0; i <= WIDTH; i++) {
        set(i, height, line[i] === 0 ? color(0) : color(255));
    }
}

function getNextLine(line) {
    const nextLine = [];
    nextLine.push(getNextCell(DEAD, line[0], line[1]));
    for (i = 1; i <= WIDTH - 1; i++) {
        const left = line[i - 1];
        const center = line[i];
        const right = line[i + 1];
        nextLine.push(getNextCell(left, center, right));
    }
    nextLine.push(getNextCell(line[WIDTH - 2], line[WIDTH - 1], DEAD));
    return nextLine;
}

function getNextCell(left, center, right) {
    const code = 1*invert(left) + 2*invert(center) + 4*invert(right);
    return RULE[code];
}

function invert(value) {
    return value === 1 ? 0 : 1;
}
