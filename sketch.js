let img_1;
let img_2;
let A_3;
let A_4;
let lettere;
let parola = ["S", "I", "N", "A", "P", "S", "I"];

function preload() {
  img_2 = loadImage("A/A-1-18.svg");
  img_1 = loadImage("A/A-2-19.svg");
  A_3 = loadImage("A/A-3-23.svg");
  A_4 = loadImage("A/A-4-22.svg");
  lettere = {
    S: [],
    I: [],
    N: [],
    A: [
      loadImage("A/A-3-23.svg"),
      loadImage("A/A-4-22.svg"),
      loadImage("A/A-1-18.svg"),
      loadImage("A/A-2-19.svg"),
    ],
    P: [],
  };
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
}

function draw() {
  background(0);
  let per = map(mouseX, 0, width, 0, 1);
  lettera(width / 2, height / 2, img_1, img_2, per);
  lettera(200, 200, img_2, img_1, 0.7);
  lettera(100, 100, A_3, A_4, 0.9);
}

function lettera(x, y, img_sx, img_dx, percentuale) {
  let larghezza_1 = map(percentuale, 0, 1, 0, img_sx.width);
  push();
  translate(x, y);

  image(img_dx, 0, 0);

  push();

  beginClip();
  rect(-img_sx.width / 2, -img_sx.height / 2, larghezza_1, img_sx.height);
  endClip();

  image(img_sx, 0, 0);

  pop();
  pop();
}
function getTwoRandomElements(arr) {
  if (arr.length < 2) {
    throw new Error("Array must have at least two elements.");
  }
  let shuffled = shuffle(arr); // p5.js's built-in shuffle function
  return [shuffled[0], shuffled[1]];
}
