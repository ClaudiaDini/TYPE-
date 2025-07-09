/** @typedef {import("./p5/types/index").Image} Image */
/** @typedef {[Image, Image]} Lettera */
/** @typedef {Lettera[]} Parola */

let gap = 10;

/** @type {Object.<string, Image[]>} */
let lettere = {};

/** @type {Parola} */
let parola;
let mic;
function preload() {
  lettere = {
    S: [
      loadImage("S/S-1.svg"),
      loadImage("S/S-2.svg"),
      loadImage("S/S-3.svg"),
      loadImage("S/S-4.svg"),
      loadImage("S/S-5.svg"),
    ],
    I: [loadImage("I/I-1.svg"), loadImage("I/I-2.svg")],
    N: [loadImage("N/N-1.svg"), loadImage("N/N-2.svg"), loadImage("N/N-3.svg")],
    A: [
      loadImage("A/A-1.svg"),
      loadImage("A/A-2.svg"),
      loadImage("A/A-3.svg"),
      loadImage("A/A-4.svg"),
    ],
    P: [
      loadImage("P/P-1.svg"),
      loadImage("P/P-2.svg"),
      loadImage("P/P-4.svg"),
      loadImage("P/P-3.svg"),
    ],
  };
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#222222");
  //frameRate(100);
  noStroke();

  //mic = new p5.AudioIn();
  //mic.start();
  Object.values(lettere).forEach((l) =>
    l.forEach((image) => image.resize(0, 100))
  );

  parola = componiParola();
}

function draw() {
  background(0);
  disegnaParola(parola);
}

/**
 * @returns {Parola}
 */
function componiParola() {
  let immagini_S = getTwoRandomElements(lettere["S"]);
  let immagini_I = getTwoRandomElements(lettere["I"]);
  let immagini_N = getTwoRandomElements(lettere["N"]);
  let immagini_A = getTwoRandomElements(lettere["A"]);
  let immagini_P = getTwoRandomElements(lettere["P"]);
  let immagini_S2 = getTwoRandomElements(lettere["S"]);
  let immagini_I2 = getTwoRandomElements(lettere["I"]);
  return [
    immagini_S,
    immagini_I,
    immagini_N,
    immagini_A,
    immagini_P,
    immagini_S2,
    immagini_I2,
  ];
}

/**
 * @param {Parola} parola
 */
function disegnaParola(parola) {
  let percentuale1 = noise(frameCount * 0.01);
  let percentuale2 = 1 - percentuale1;

  let width_totale = (parola.length - 1) * gap;
  for (let coppia of parola) {
    width_totale += coppia[0].width / 2 + coppia[1].width / 2;
  }

  let height_totale = parola[0][0].height;

  //let level = mic.getLevel() * 250;
  //let percentuale1 = map(level, 0, 1, 1, 0, true);
  //let percentuale2 = map(level, 0, 1, 0, 1, true);

  //let percentuale1 = map(mouseX, 0, width, 1, 0, true);
  //let percentuale2 = map(mouseX, 0, width, 0, 1, true);
  let x = -width_totale / 2;
  let y = -height_totale / 2;

  translate(width / 2, height / 2);
  scale(width / width_totale / 1.5);

  push();
  translate(x, y);
  for (let i = 0; i < parola.length; i++) {
    let coppia = parola[i];
    lettera(0, 0, coppia, i % 2 == 0 ? percentuale1 : percentuale2);
    translate(coppia[0].width / 2 + coppia[1].width / 2 + gap, 0);
  }
  pop();
}

function mousePressed() {
  parola = componiParola();
}

function keyPressed() {
  if (key == "s") {
    saveGif("SINAPSI.gif", 5);
  }
}

/**
 *
 * @param {number} x
 * @param {number} y
 * @param {Image[]} coppia
 * @param {number} percentuale
 */
function lettera(x, y, coppia, percentuale) {
  let img_sx = coppia[0];
  let img_dx = coppia[1];

  let cx = x + img_sx.width / 2;
  let cy = y + img_sx.height / 2;

  push();
  imageMode(CENTER);
  translate(cx, cy);

  let base_x = -img_sx.width / 2;
  let base_y = -img_sx.height / 2;
  let mask_w = img_sx.width / 2 + img_dx.width / 2;
  let mask_h = img_sx.height;

  let mask_sx_w = mask_w * percentuale;

  beginClip();
  rect(base_x, base_y, mask_w, mask_h);
  endClip();

  push();
  beginClip();
  rect(base_x, base_y, mask_sx_w, mask_h);
  endClip();
  image(img_sx, 0, 0);
  pop();

  push();
  beginClip();
  rect(base_x + mask_sx_w, base_y, mask_w - mask_sx_w, mask_h);
  endClip();
  image(img_dx, 0, 0);
  pop();

  pop();
}

/**
 * @param {Image[]} arr
 * @returns {[Image, Image]}
 */
function getTwoRandomElements(arr) {
  if (arr.length < 2) {
    throw new Error("Array must have at least two elements.");
  }
  let shuffled = shuffle(arr); // p5.js's built-in shuffle function
  return [shuffled[0], shuffled[1]];
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
