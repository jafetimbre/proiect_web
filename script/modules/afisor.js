export default class afisor {
  constructor(btns) {
    this.width = 600;
    this.height = 400;
    this.backgroundColor = 255;
    this.padding = 40;

    this.canvas = null;
    this.p = null;
    this.running = false;

    this.btns = btns;
    this.offsetY = Math.floor(this.height / 2);
    this.values = [0];
    this.display = "Coordonates";
    this.init();
  };
  init = () => {
    this.btns[0].addEventListener("click", () => {
      this.running = true;
    });
    this.btns[1].addEventListener("click", () => {
      this.running = false;
    });
    this.btns[2].addEventListener("click", () => {
      this.reset();
    });
  }
  scetch = p => {
    p.setup = () => {
      p.frameRate(60);
      this.canvas = p.createCanvas(this.width, this.height);
      this.p = p;
      p.background(this.backgroundColor);
    };
    p.draw = () => {
      p.background(this.backgroundColor);
      this.drawScales();
      this.drawGraph(this.values);
      this.drawCord();
      if (this.running) {
        this.update();
      }
      if (0 < p.mouseX && p.mouseX < this.width && 0 < p.mouseY && p.mouseY< this.height) {
        this.drawMouse();
        this.updateCord()
      }
    };
  };
  reset = () => {
    this.values = [0];
  };
  drawGraph = (graph) => {
    this.p.stroke(51,153,255);
    this.p.noFill();
    this.p.beginShape();
    var i = 0;
    for (i = 0; i < graph.length; ++i) {
      this.p.vertex(this.transX(i), this.transY(this.values[i]));
    } 
    this.p.endShape();
    this.p.ellipse(this.transX(i-1), this.transY(this.values[i-1]),10);
  };
  drawScales = (g) => {
    var step = 10;
    this.p.stroke(10);
    this.p.fill(10);
    this.p.textSize(12);
    //  vertical axis
    this.p.textAlign(this.p.RIGHT,this.p.CENTER);
    this.p.line(this.padding,this.padding,this.padding,this.height-this.padding);
    this.p.line(this.padding,this.padding,this.padding-5,this.padding+5);
    this.p.line(this.padding,this.padding,this.padding+5,this.padding+5);
    for(var i = this.height-this.padding; i >= this.padding+20; i -=step) { 
      if ((i-10)%50==0) {
        this.p.line(this.padding,i,this.padding-12,i);
        this.p.text(Math.abs(i-360)/10,this.padding-15,i);
      }
      else {
        this.p.line(this.padding,i,this.padding-5,i);
      }
    };
    //  horizontal axis
    this.p.textAlign(this.p.CENTER,this.p.CENTER);
    this.p.line(this.padding,this.height-this.padding,this.width-this.padding,this.height-this.padding);
    this.p.line(this.width-this.padding,this.height-this.padding,this.width-this.padding-5,this.height-this.padding-5);
    this.p.line(this.width-this.padding,this.height-this.padding,this.width-this.padding-5,this.height-this.padding+5);
    for(var i = this.padding; i < this.width-this.padding-15; i +=step) {
      if ((i-this.padding)%50==0) {
        this.p.line(i,this.height-this.padding,i,this.height-this.padding+12);
        this.p.text((i-this.padding)/10,i,this.height-this.padding+20);
      }
      else {
        this.p.line(i,this.height-this.padding,i,this.height-this.padding+5);
      }
    };
  };
  drawCord = () => {
    this.p.stroke(10);
    this.p.textSize(15);
    this.p.fill(10);
    this.p.text(this.display, this.width-this.padding-60, this.padding-15);
  }
  updateCord = () => {
    var cx = this.p.constrain(this.p.mouseX, this.padding, this.width-60);
    var cy = this.p.constrain(this.p.mouseY, this.padding+this.padding/2, this.height-this.padding);
    this.display = `x: ${this.transXInv(cx).toPrecision(3)}    y: ${this.transYInv(cy).toPrecision(3)}`;
  };
  transX = x => x + this.padding;
  transXInv = x => this.p.map(x, this.padding, this.width-60, 0,50);
  transY = y => this.p.map(y, 0,30, this.height-this.padding,this.padding+this.padding/2);
  transYInv = y => this.p.map(y, this.height-this.padding, this.padding+this.padding/2, 0,30);
  update = () => {
    var newValue = ((Math.random()*3) - 3/2) + this.values[this.values.length-1];
    if (newValue > 30) newValue = 30;
    if (newValue < 0) newValue = 0;

    this.values.push(newValue);
    if (this.values.length >= this.width-30-50) {
      this.values.shift();
    };
  };
  drawMouse = () => {
    this.p.stroke(255,0,0);
    var x = this.p.mouseX;
    var cX = this.p.constrain(x,this.padding, this.width-60);
    var y = this.p.mouseY;
    var cY = this.p.constrain(y,60, this.height-this.padding);
    this.p.line(this.padding,cY, this.width-this.padding,cY);
    this.p.line(cX,this.height-this.padding, cX,this.padding);
  }
}