let img_1;
let img_2;

function preload() {
  img_2 = loadImage("A/A-1-18.svg");
  img_1 = loadImage("A/A-2-19.svg");
}

function setup() {
  createCanvas(200, 200);
  imageMode(CENTER);
}

function draw() {
  background(0);

  let larghezza_1 = map(mouseX, 0, width, 0, img_1.width);

  translate(width / 2, height / 2);

  image(img_2, 0, 0);

  push();

  beginClip();
  rect(-img_1.width / 2, -img_1.height / 2, larghezza_1, img_1.height);
  endClip();

  image(img_1, 0, 0);

  pop();
}
