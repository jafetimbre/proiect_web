export default class afisor {
  constructor() {
    this.width = 600;
    this.height = 400;
    this.backgroundColor = 255;

    this.canvas = null;
    this.p = null;
    this.running = false;

    this.offsetY = Math.floor(this.height / 2);
    this.values = []
  };

  scetch = p => {
    p.setup = () => {
      this.canvas = p.createCanvas(this.width, this.height);
      this.p = p;

      p.background(this.backgroundColor);
      p.noLoop();
    };

    p.draw = () => {
      p.background(this.backgroundColor);

      
      this.drawScales();
      this.drawGraph(this.values);
      this.update();
      this.drawMouse();
      //this.drawGraph(this.values);
      //this.update();
    };
  };
  drawGraph = (graph) => {
    this.p.stroke(51,153,255);
    this.p.noFill()
    this.p.beginShape();
    var i = 0;
    for (i = 0; i < graph.length; ++i) {
      this.p.vertex(i + 30, graph[i]);
    } 
    this.p.endShape();
  }
  drawScales = (g) => {
    var padding = 30;
    var step = 10;
    this.p.stroke(10);
    this.p.line(padding,padding,padding,this.height-padding);
    this.p.line(padding,padding,padding-5,padding+5);
    this.p.line(padding,padding,padding+5,padding+5);
    for(var i = this.height-padding; i >= padding+20; i -=step) {
      this.p.line(padding,i,padding-5,i);
    }

    this.p.line(padding,this.height-padding,this.width-padding,this.height-padding)
    this.p.line(this.width-padding,this.height-padding,this.width-padding-5,this.height-padding-5);
    this.p.line(this.width-padding,this.height-padding,this.width-padding-5,this.height-padding+5);
    for(var i = padding; i < this.width-padding-15; i +=step) {
      this.p.line(i,this.height-padding,i,this.height-padding+5);
    }
  }
  update = () => {
    var zero = this.height - 30;
    var newValue = Math.floor(Math.random() * zero-30)+30;
    this.values.push(newValue);
    if (this.values.length >= this.width-30-50) {
      this.values.shift();
    }
  }
  drawMouse = () => {
    this.p.stroke(255,0,0);
    var x = this.p.mouseX;
    var cX = this.p.constrain(x,30, this.width-50);

    var y = this.p.mouseY;
    var cY = this.p.constrain(y,50, this.height-30);

    this.p.line(30,cY, this.width-30,cY);
    this.p.line(cX,this.height-30, cX,30);
  }
}