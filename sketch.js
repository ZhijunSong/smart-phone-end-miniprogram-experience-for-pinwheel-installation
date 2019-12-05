let r = 72;
let b = [98, 41, 84];
let balls = [];
//maple
let sketch1 = function(p) {
  let xspacing = 10; // Distance between each horizontal location
  let w; // Width of entire wave
  let theta = 0.0; // Start angle at 0
  let amplitude = 36.0; // Height of wave
  let period = 300.0; // How many pixels before the wave repeats
  let dx; // Value for incrementing x
  let yvalues; // Using an array to store height values for the wave
  let c1, c2, c3, c4;

  p.setup = function() {
    p.createCanvas(384, 72);
    p.frameRate(20);
    w = p.width + 10;
    yvalues = new Array(p.floor(w / xspacing));
  };

  p.draw = function() {
    p.background(b);
    theta += 0.1;
    c1 = p.color('#5A6FF6');
    c2 = p.color('#9A5AF6');
    c3 = p.color('#E85AF6');
    c4 = p.color('#F65AB6');
    dx = (p.TWO_PI / period) * xspacing;
    p.calcWave();
    p.renderWave();
  };

  p.calcWave = function() {
    // Increment theta (try different values for
    // 'angular velocity' here)

    // For every x value, calculate a y value with sine function
    let x = theta;
    for (let i = 0; i < yvalues.length; i++) {
      //    for (let j = 0; j < ) {
      yvalues[i] = p.sin(x) * amplitude;
      x += dx;
      //  }
    }
  }

  p.renderWave = function() {
    //p.stroke(1);
    p.noStroke();
    var a = 255;
    for (let x = 0; x < yvalues.length; x++) {
      p.fill("#D0104C");

      p.rect(x * xspacing, p.height / 2 + yvalues[x] - 40, 10, 10);
    }
    for (let x = 0; x < yvalues.length; x++) {
      p.fill("#F17C67");

      p.rect(x * xspacing, p.height / 2 + yvalues[x] - 30, 10, 10);
    }
    for (let x = 0; x < yvalues.length; x++) {
      p.fill("#E16B8C");

      p.rect(x * xspacing, p.height / 2 + yvalues[x] - 20, 10, 10);
    }

    //var i =0;
    // A simple way to draw the wave with an ellipse at each location
    for (let x = 0; x < yvalues.length; x++) {
      p.fill("#EB7A77");

      p.rect(x * xspacing, p.height / 2 + yvalues[x] - 10, 10, 10);
    }
    for (let x = 0; x < yvalues.length; x++) {
      p.fill("#FEDFE1");
      p.rect(x * xspacing, p.height / 2 + yvalues[x], 10, 10);
    }
    for (let x = 0; x < yvalues.length; x++) {
      p.fill("#B481BB");
      p.rect(x * xspacing, p.height / 2 + yvalues[x] + 10, 10, 10);
    }
    for (let x = 0; x < yvalues.length; x++) {
      p.fill("#B28FCE");

      p.rect(x * xspacing, p.height / 2 + yvalues[x] + 20, 10, 10);
    }
    for (let x = 0; x < yvalues.length; x++) {
      p.fill("#7B90D2");

      p.rect(x * xspacing, p.height / 2 + yvalues[x] + 30, 10, 10);
    }
    for (let x = 0; x < yvalues.length; x++) {
      p.fill("#7B90D2");

      p.rect(x * xspacing, p.height / 2 + yvalues[x] + 40, 10, 10);
    }
    // i+=1;
  }

}
let myp51 = new p5(sketch1, "c1");

/////greenfield
let sketch3 = function(p) {
  let buttoneffect = [];
  let r = 40;

  ////////////////////////////
  var cols, rows;
  var scl = 12;
  var zoff = 0;
  var flowfield;
  var inc = 0.3;
  /////timer

  var num = 0;
  var num2 = 0;
  let t = 0;
  let count = 10; /// use to count if noone shows
  let colors = ["#DAC9A6", "#FBE251", "#90B44B", "#91B493", "#1B813E"];

  p.setup = function() {
    p.createCanvas(384, 72);
    rows = p.floor(p.height / scl);
    cols = p.floor(p.width / scl);
    flowfield = new Array(cols * rows);
    p.frameRate(30);
  };
  class Particle {
    constructor(x, y, c, r, vx, vy) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.pos = p.createVector(this.x, this.y);
      this.acc = p.createVector(0, 0);
      this.vel = p.createVector(0, 0);
      this.maxspeed = 2;

      this.vx = vx;
      this.vy = vy;
      this.alpha = p.random(255);
      this.c = c;
      this.color = p.color(this.c);
    }
    show() {
      p.noStroke();
      // stroke(255);
      p.fill(this.color);
      p.ellipse(this.pos.x, this.pos.y, this.r);


    }
    update() {
      this.vel.x += this.vx;
      this.vel.y += this.vy;
      this.alpha -= 2;
      this.vel.add(this.acc);
      this.vel.limit(this.maxspeed);

      this.pos.add(this.vel);
      this.acc.mult(0);
    }
    finished() {
        return this.alpha < 0;
      }
      /////////////////////////////
    applyForce(force) {
      this.acc.add(force);
    }
    edges() {
      if (this.pos.x > p.width) this.pos.x = 0;
      if (this.pos.x < 0) this.pos.x = p.width;
      if (this.pos.y > p.height) this.pos.y = 0;
      if (this.pos.y < 0) this.pos.y = p.height;

    }
    follow(vectors) {
      var x = p.floor(this.pos.x / scl);
      var y = p.floor(this.pos.y / scl);
      var index = x + y * cols;
      var force = vectors[index];
      this.applyForce(force);
    }
  }

  p.countdown = function() {
    if (p.frameCount % 10 === 0 && count > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
      count--;
    }
    if (count === 0) {
      count = 0;
      count = 10;
    }

  }

  p.timer = function() {
    if (p.frameCount % 10 === 0 && t < 11) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
      t++;
    }
    if (t === 10) {
      num = num + 1;

      t = 0;
    }

    num2 = num % 5;

  }
  p.draw = function() {
    p.background(b);
    let vx = p.random(-2, 1);
    let vy = p.random(-10, -2);
    var F = p.createVector(0, 0);

    var F1 = p.createVector(10, 0);
    var F2 = p.createVector(-3, 0);
    for (let i = 0; i < 2; i++) {
      let b = new Particle(p.random(p.width), p.random(p.height), colors[num2], 20, vx, vy);
      buttoneffect.push(b);
    }


    for (let i = buttoneffect.length - 1; i >= 0; i--) {
      buttoneffect[i].show();
      buttoneffect[i].update();
      buttoneffect[i].edges();
      buttoneffect[i].applyForce(F2);
      buttoneffect[i].follow(flowfield);
      if (buttoneffect[i].finished()) {
        buttoneffect.splice(i, 1);
      }
    }


    ////////////////flow field//////////////
    var yoff = p.PI / 2;

    for (var y = 0; y < rows; y++) {
      var xoff = 0;
      for (var x = 0; x < cols; x++) {

        var index = x + y * cols;
        var angle = p.noise(xoff, yoff, zoff) * p.TWO_PI;
        var v = p5.Vector.fromAngle(angle);
        flowfield[index] = v;
        v.setMag(10);
        xoff += inc;
        //fill(r);
        // rect(x * scl, y * scl, scl, scl);
        p.stroke(0);
        p.push();
        p.translate(x * scl + scl, y * scl + scl);
        //rotate(v.heading());
        p.rotate(p.PI / 2 + v.heading());
        p.stroke(255, 50);
        p.strokeWeight(2);
        // line(0, 0, scl, 0);
        p.pop();
      }
      yoff += inc;
      zoff += 0.001;

    }
    p.countdown();
    p.timer();

  };
}
let myp53 = new p5(sketch3, "c3");
///////
/////cherry blossom
let sketch2 = function(p) {
  let numBalls = 50;
  let spring = 0.03;
  let gravity = 0.0;
  let friction = -0.9;
  let balls = [];
  var num = 0;
  var num2 = 0;
  ///////
  let t = 0;
  var cols, rows;
  var scl = 12;
  var zoff = 0;
  var flowfield;
  var inc = 0.1;
  class Ball {
    constructor(xin, yin, din, idin, oin, c) {
      this.x = xin;
      this.y = yin;
      this.vx = 0;
      this.vy = 0;
      this.diameter = din;
      this.id = idin;
      this.others = oin;

      this.pos = p.createVector(this.x, this.y);
      this.acc = p.createVector(0, 0);
      this.vel = p.createVector(0, 0);
      this.maxspeed = 2;
      this.c = [255, 255, 255, 50];
    }

    collide(a, b) {
      var colorchange = false;

      for (let i = this.id + 1; i < numBalls; i++) {
        // console.log(others[i]);
        let dx = this.others[i].x - this.x;
        let dy = this.others[i].y - this.y;
        let distance = p.sqrt(dx * dx + dy * dy);
        let minDist = this.others[i].diameter / 2 + this.diameter / 2;
        //   console.log(distance);
        //console.log(minDist);
        if (distance < minDist) {
          //console.log("2");
          let angle = p.atan2(dy, dx);
          let targetX = this.x + p.cos(angle) * minDist;
          let targetY = this.y + p.sin(angle) * minDist;
          let ax = (targetX - this.others[i].x) * spring;
          let ay = (targetY - this.others[i].y) * spring;
          this.vx -= ax;
          this.vy -= ay;
          this.others[i].vx += ax;
          this.others[i].vy += ay;
          colorchange = !colorchange;

        }

      }
      if (colorchange === true) {

        this.c = b;

      } else if (colorchange === false) {
        this.c = a;


      }

    }


    move() {
      this.vy += gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.position = p.createVector(this.x, this.y);
      this.vel.add(this.acc);
      this.vel.limit(this.maxspeed);

      this.pos.add(this.vel);
      this.acc.mult(0);
      if (this.x + this.diameter / 2 > p.width) {
        this.x = p.width - this.diameter / 2;
        this.vx *= friction;
      } else if (this.x - this.diameter / 2 < 0) {
        this.x = this.diameter / 2;
        this.vx *= friction;
      }
      if (this.y + this.diameter / 2 > p.height) {
        this.y = p.height - this.diameter / 2;
        this.vy *= friction;
      } else if (this.y - this.diameter / 2 < 0) {
        this.y = this.diameter / 2;
        this.vy *= friction;
      }
    }

    display() {
      p.noStroke();
      p.fill(this.c);
      p.ellipse(this.x, this.y, this.diameter, this.diameter);
    }
    applyForce(force) {
      this.acc.add(force);
    }
    follow(vectors) {
      var x = p.floor(this.pos.x / scl);
      var y = p.floor(this.pos.y / scl);
      var index = x + y * cols;
      var force = vectors[index];
      this.applyForce(force);

    }

  }
  p.timer = function() {

    if (p.frameCount % 60 === 0 && t < 10) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
      t++;
    }
    if (t === 10) {
      num = num + 1;

      t = 0;
    }

    num2 = num % 9;
  }
  p.setup = function() {
    p.createCanvas(384, 72);
    p.frameRate(60);
    for (let i = 0; i < numBalls; i++) {
      balls[i] = new Ball(
        p.random(p.width),
        p.random(p.height),
        24,
        i,
        balls, num2
      );
    }
    p.noStroke();
    p.fill(255, 200);
    rows = p.floor(p.height / scl);
    cols = p.floor(p.width / scl);
    flowfield = new Array(cols * rows);

  };

  p.draw = function() {
    p.background(b);
    var F = p.createVector(0, 0);

    if (t === 0) {
      F = p.createVector(p.random(-2, 2), p.random(-2, 2));
      gravity = p.random(-0.03, 0.03);
    } else {
      F = p.createVector(0, 0);
      gravity = 0.0;
    }
    balls.forEach(ball => {
      ball.collide("#FEDFE1", "#F17C67");
      ball.move();
      ball.display();

      ball.follow(flowfield);
      ball.applyForce(F);

    });

    var yoff = p.PI / 2;

    for (var y = 0; y < rows; y++) {
      var xoff = 0;
      for (var x = 0; x < cols; x++) {

        var index = x + y * cols;
        var angle = p.noise(xoff, yoff, zoff) * p.TWO_PI;
        var v = p5.Vector.fromAngle(angle);
        flowfield[index] = v;
        v.setMag(10);
        xoff += inc;
        //fill(r);
        // rect(x * scl, y * scl, scl, scl);
        p.stroke(0);
        p.push();
        p.translate(x * scl, y * scl);
        p.rotate(v.heading());
        p.stroke(255, 50);
        p.strokeWeight(2);
        // line(0, 0, scl, 0);
        p.pop();
      }
      yoff += inc;
      zoff += 0.001;

    }
    p.timer();
  };


}
let myp52 = new p5(sketch2, "c2");

let sketch4 = function(p) {
  var y = 72;
  p.setup = function() {
    p.createCanvas(384, 72);
    p.frameRate(30);
    p.stroke("#FFB11B"); // Set line drawing color to white
    p.strokeWeight(5);
  };

  p.draw = function() {
    p.background("#B54434"); // Set the background to black

    y = y - 3;

    if (y < -50) {
      y = p.height + 50;
    }
    for (var i = 0; i < 5; i++) {
      p.line(0, y + i * 10, p.width, y + i * 10);

    }
  };

}
let myp54 = new p5(sketch4, "c4");

//////////


let sketch5 = function(p) {
  let cols;

  let t = 0;
  let sp=1;
  p.setup = function() {
    p.createCanvas(384, 72);
    p.frameRate(30);
    cols = p.width / 5;
  };

  p.draw = function() {
    p.background(b);
    t+=sp;
    if (t===p.width||t===0){
      sp=sp*-1;
      
    }

    // for (let i = 0; i < cols; i++) {
    p.noStroke();
    p.push();
    p.translate(t, 0);
    p.fill(255);
    p.rect(0, 0, r, r);
    p.fill("#D2E9E1");
    p.rect(50, 0, r, r);
    p.fill("#F8DDA9");
    p.rect(100, 0, r, r);
    p.fill("#FCB6D0");
    p.rect(150, 0, r, r);
    p.fill("#FBEDC9");
    p.rect(200, 0, r, r);
    p.fill("#B6DCB6");
    p.rect(250, 0, r, r);
    p.pop();
    // }
  };

};
let myp55 = new p5(sketch5, "c5");

