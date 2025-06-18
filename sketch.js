/** @typedef {import("./p5/types/index").Image} Image */

//let img_1;
//let img_2;
//let A_3;
//let A_4;
let percentuale = 0.5 * outputVolume(100);
let gap = 10;

/** @type {Object.<string, Image[]>} */
let lettere = {};

let parola = ["S", "I", "N", "A", "P", "S", "I"];

function preload() {
  //img_2 = loadImage("A/A-1-18.svg");
  //img_1 = loadImage("A/A-2-19.svg");
  //A_3 = loadImage("A/A-3-23.svg");
  //A_4 = loadImage("A/A-4-22.svg");
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
  noLoop();
  noStroke();

  Object.values(lettere).forEach((l) =>
    l.forEach((image) => image.resize(0, 100))
  );
}

function draw() {
  background(0);
  disegnaParola();
}

function disegnaParola() {
  let immagini_S = getTwoRandomElements(lettere["S"]);
  let s_len = immagini_S[0].width / 2 + immagini_S[1].width / 2;
  let immagini_I = getTwoRandomElements(lettere["I"]);
  let i_len = immagini_I[0].width / 2 + immagini_I[1].width / 2;
  let immagini_N = getTwoRandomElements(lettere["N"]);
  let n_len = immagini_N[0].width / 2 + immagini_N[1].width / 2;
  let immagini_A = getTwoRandomElements(lettere["A"]);
  let a_len = immagini_A[0].width / 2 + immagini_A[1].width / 2;
  let immagini_P = getTwoRandomElements(lettere["P"]);
  let p_len = immagini_P[0].width / 2 + immagini_P[1].width / 2;
  let immagini_S2 = getTwoRandomElements(lettere["S"]);
  let s2_len = immagini_S2[0].width / 2 + immagini_S2[1].width / 2;
  let immagini_I2 = getTwoRandomElements(lettere["I"]);
  let i2_len = immagini_I2[0].width / 2 + immagini_I2[1].width / 2;

  let len_totale =
    s_len + i_len + n_len + a_len + p_len + s2_len + i2_len + gap * 6;
  let height_totale = immagini_S[0].height;

  let x = (width - len_totale) / 2;
  let y = (height - height_totale) / 2;

  // rect(x, y, len_totale, height_totale);

  push();
  translate(x, y);
  lettera(0, 0, immagini_S, 0.5);
  translate(s_len + gap, 0);
  lettera(0, 0, immagini_I, 0.5);
  translate(i_len + gap, 0);
  lettera(0, 0, immagini_N, 0.5);
  translate(n_len + gap, 0);
  lettera(0, 0, immagini_A, 0.5);
  translate(a_len + gap, 0);
  lettera(0, 0, immagini_P, percentuale);
  translate(p_len + gap, 0);
  lettera(0, 0, immagini_S2, percentuale);
  translate(s2_len + gap, 0);
  lettera(0, 0, immagini_I2, percentuale);
  translate(i2_len + gap, 0);

  pop();
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

  // let larghezza_1 = map(percentuale, 0, 1, 0, img_sx.width);
  // let larghezza_2 = img_dx.width - larghezza_1;

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

  // //immagine sinistra
  // push();
  // imageMode(CENTER);
  // translate(x + img_sx.width / 2, y + img_sx.height / 2);

  // push();

  // beginClip();
  // rect(-img_sx.width / 2, -img_sx.height / 2, larghezza_1, img_sx.height);
  // endClip();

  // image(img_sx, 0, 0);

  // pop();

  // pop();

  // //immagine destra
  // push();
  // imageMode(CENTER);
  // translate(x + img_dx.width / 2, y + img_dx.height / 2);

  // push();

  // beginClip();
  // rect(
  //   -img_dx.width / 2 + larghezza_1,
  //   -img_dx.height / 2,
  //   larghezza_2,
  //   img_dx.height
  // );
  // endClip();

  // image(img_dx, 0, 0);

  // pop();
  // pop();
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
