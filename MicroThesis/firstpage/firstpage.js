var particles_a = [];
var particles_b = [];
var particles_c = [];
var nums =25;
var noiseScale = 900;//j

function setup(){
  createCanvas(windowWidth, windowHeight);
  background(0);
  for(var i = 0; i < nums; i++){
    particles_a[i] = new Particle(random(10, width),random(10,height));
    particles_b[i] = new Particle(random(10, width),random(10,height));
    particles_c[i] = new Particle(random(10, width),random(10,height));
  }
}

function draw(){
  noStroke();
  smooth();
    for(var i = 10; i < nums; i++){
    var radius = map(i,0,nums,1,1.2);
    var alpha = map(i,0,nums,0,250);

    fill(69,33,124,alpha);
    particles_a[i].move();
    particles_a[i].display(radius);
    particles_a[i].checkEdge();

    fill(100,200,250,alpha);
    particles_b[i].move();
    particles_b[i].display(radius);
    particles_b[i].checkEdge();

    fill(250,250,250,alpha);
    particles_c[i].move();
    particles_c[i].display(radius);
    particles_c[i].checkEdge();
  }  
}


function Particle(x, y){
  this.dir = createVector(20, 20);
  this.vel = createVector(20, 20);
  this.pos = createVector(x, y);
  this.speed = 0.4;

  this.move = function(){
    var angle = noise(this.pos.x/noiseScale, this.pos.y/noiseScale)*TWO_PI*noiseScale;
    this.dir.x = cos(angle);
    this.dir.y = sin(angle);
    this.vel = this.dir.copy();
    this.vel.mult(this.speed);
    this.pos.add(this.vel);
  }

  this.checkEdge = function(){
    if(this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0){
      this.pos.x = random(50, width);
      this.pos.y = random(50, height);
    }
  }

  this.display = function(r){
    ellipse(this.pos.x, this.pos.y, r, r);
  }
}
