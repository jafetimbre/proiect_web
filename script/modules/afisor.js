import ajax from "../ajax.js";

export default class afisor {
  constructor() {
    this.width = 600;
    this.height = 400;
    this.backgroundColor = 255;

    this.canvas = null;
    this.p = null;
    this.running = false;

    this.offsetY = Math.floor(this.height / 2);
<<<<<<< Updated upstream
    this.values = []
=======
    this.display = "Coordonates";

    this.graph = null;

    this.init();
>>>>>>> Stashed changes
  };

  scetch = p => {
    p.setup = () => {
      this.canvas = p.createCanvas(this.width, this.height);
      this.p = p;
<<<<<<< Updated upstream
=======
      this.graph = new Graph(p, {
        left: this.padding,
        right: 500
    }, this.transY(0), 100.0, 200.0);

    setInterval(() => {
      if (this.running) {
        var res = ajax.get("http://davos.science.upm.ro/~traian/web_curs/ap_electric.php",  false);
        var xmlDoc = new DOMParser().parseFromString(res, "text/xml");
        var minVal = xmlDoc.documentElement.childNodes[23].textContent;
        var maxVal = xmlDoc.documentElement.childNodes[25].textContent;
        var val = xmlDoc.documentElement.childNodes[21].textContent;
        var val = p.map(val, minVal, maxVal, 0, 30);
        this.graph.set(val);
      }
    },1000);
>>>>>>> Stashed changes

      p.background(this.backgroundColor);
      p.noLoop();
    };

    p.draw = () => {
      p.background(this.backgroundColor);
<<<<<<< Updated upstream

      
=======
      this.graph.render();
      if (this.running) {
        this.graph.calculate();
      }
      var col = this.graph.hasPoint(this.setPrec(p.mouseX, 2), this.setPrec(p.mouseY, 2));
      if (col!= null && this.hovered === true) {
        p.ellipse(col.x, col.y, 5);
        this.drawMouse(col.x, col.y);
        this.updateCord(col.x, col.y);
      }
>>>>>>> Stashed changes
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

class Graph {
  constructor(p, bounds, origin, f=null) {
    this.p = p;
    this.bounds = bounds;
    this.origin = origin;
    this.xspacing = 5;

    this.maxPoints = Math.floor(this.bounds.right / this.xspacing);
    this.values = new Array(this.maxPoints); //width
    this.f = f;
  }
  set(value) {
    this.values.push(value);
    this.values.shift();
  }
  calculate() {}
  render() {
    this.p.stroke(51, 153, 255);
    this.p.strokeWeight(2);
    this.p.noFill();
    this.p.beginShape();
    for (let x = 0; x < this.values.length; x++) {
      this.p.vertex(x * this.xspacing + this.bounds.left, this.origin - this.values[x] *10);
      this.p.stroke(0);
      this.p.strokeWeight(5);
      this.p.point(x * this.xspacing + this.bounds.left, this.origin - this.values[x] *10);
      this.p.stroke(51, 153, 255);
      this.p.strokeWeight(2);
    }
    this.p.endShape();
    this.p.strokeWeight(1);
  }
  hasPoint(x, y) {
    var precision = 5;
    for (var i = 0; i < this.values.length; i++) {
      if (Math.abs((i * this.xspacing + this.bounds.left) - x) <= precision &&
        Math.abs((this.origin - this.values[i] *10) - y) <= precision) {
        return {x:i * this.xspacing + this.bounds.left, y: this.origin - this.values[i] *10};
      }
    }
    return null;
  }
}