var canvas = null;

let box1;
let box2;
let countDiv;

const timeStep = 5000; // 50000000

const digits = 5;
let value = Math.pow(100, digits - 1);

let count = 0;

function setup() {
  canvas = createCanvas(800, 400);
  canvas.parent('sketch-holder');
  background(0, 100, 200);
  box1 = new Box(200, 50, 1, 0, 0);
  box2 = new Box(400, 100, value, -2 / timeStep, 50);
  countDiv = createDiv(count);
  countDiv.parent('sketch-holder');
  countDiv.style('font-size', '30pt');
}

function draw() {
  background(200);

  for (let i = 0; i < timeStep; ++i) {

    if (box1.collide(box2)) {
      const v1 = box1.bounce(box2);
      const v2 = box2.bounce(box1);
      box1.v = v1;
      box2.v = v2;
      count++;
    }
    if (box1.hitWall()) {
      box1.reverse();
      count++;
    }
    box1.update();
    box2.update();
  }
  box1.show();
  box2.show();
  var nr = count.toString().substr(0,1) + ',' + count.toString().substr(1,9);
  countDiv.html(nr);
}

class Box {
  constructor(x, w, m, v, xC) {
    this.x = x;
    this.y = height - w - 1; // -1 for the border
    this.w = w;
    this.v = v;
    this.m = m;
    this.xConst = xC;
  }

  hitWall() {
    return (this.x <= 0);
  }

  reverse() {
    this.v *= -1;
  }

  collide(obj) {
    return !(this.x + this.w < obj.x || this.x > obj.x + obj.w);
  }

  bounce(obj) {
    let sumM = this.m + obj.m;
    let nV = (this.m - obj.m) / sumM * this.v + (2 * obj.m / sumM) * obj.v;
    return nV;
  }

  update() {
    this.x += this.v;
  }

  show() {
    const x = constrain(this.x, this.xConst, width+1);
    fill(86, 132, 206);
    rect(x, this.y, this.w, this.w);
  }
}