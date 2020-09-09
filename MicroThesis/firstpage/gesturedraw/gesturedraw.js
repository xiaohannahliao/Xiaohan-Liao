// ml5.js: Pose Estimation with PoseNet
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/Courses/ml5-beginners-guide/7.1-posenet.html
// https://youtu.be/OIo-DIOkNVg
// https://editor.p5js.org/codingtrain/sketches/ULA97pJXR

let video;
let poseNet;
let pose;
let skeleton;
var wave;
let wristD;
let amplif;
let detections;
var wave2;
let oscCount = 100;
let allOscs = [];
let minFreq = 100;
let maxFreq = 1000;
let song;
let vg1;
var ps= [];
var particles_a = [];
var particles_b = [];
var particles_c = [];
var nums =25;
let xk;
let yk;
var noiseScale = 900;
function preload() {
  vg1 = createAudio('welcome.mp3');
  song = createAudio('wind.mp3');
}
function setup() {

  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.size(windowWidth, windowHeight);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
  for (let i = 0; i < oscCount; i++) {
    let osc = new p5.Oscillator();
    osc.setType('sine');
    osc.freq(random(minFreq, maxFreq));
    // scale amplitude to number of oscillators
    osc.amp(1.0 / oscCount); 
    osc.start();
    allOscs.push(osc);
  }

  song.volume(0.1);
  vg1.volume(1);

for(var i = 0; i < nums; i++){
    particles_a[i] = new Particle(random(0, windowWidth),random(0,windowHeight));
    particles_b[i] = new Particle(random(0, windowWidth),random(0,windowHeight));
    particles_c[i] = new Particle(random(0, width),random(0,height),3,3,0.3);
  }
  
   //textFont(inconsolata);
 
   background(0);

 
}


function gotPoses(poses) {
  //console.log(poses); 
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}


function modelLoaded() {
  console.log('poseNet ready');
}

function draw() {
  fill(0,0.2);
  rect(0, 0, windowWidth, windowHeight);
  song.loop();
  vg1.play();
   //   filter(BLUR, 10);
  if (pose) {

    let eyeR = pose.rightEye;
    let eyeL = pose.leftEye;
    let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);


    var red = map(pose.rightWrist.x, 0, windowWidth, 150, 255);
    var green = map((pose.rightWrist.x - pose.rightWrist.y), 0, windowWidth, 100, 255);
    var blue = map((pose.leftWrist.x - pose.leftWrist.y), 0, windowHeight, 100, 255);

  //  fill(red, green, blue,100);
   // stroke(red, green, blue,255);

    wristD=dist(pose.rightWrist.x, pose.rightWrist.y, pose.leftWrist.x, pose.leftWrist.y);
    amplif=pose.rightWrist.y;
    var dia = 1 + (sin(pose.leftWrist.x) * pose.leftWrist.x);
    var dia2 = 10 + (cos(pose.rightWrist.x) * pose.rightWrist.x);
   //ellipse(pose.rightWrist.x, pose.rightWrist.y, dia);
    //ellipse(pose.leftWrist.x, pose.leftWrist.y, dia2);

   noStroke();
    
  smooth();
   /* for(var i = 0; i < nums; i++){

   var newP = new Particle(pose.rightWrist.x, pose.rightWrist.y, pose.rightWrist.x, pose.rightWrist.y,0.1);
       var newp2 =new Particle(pose.leftWrist.x, pose.leftWrist.y, pose.rightWrist.x, pose.rightWrist.y,0.3);
         var newp3 =new Particle(pose.rightEye.x, pose.rightEye.y, pose.rightWrist.x, pose.rightWrist.y,0.3);
      particles_a[i]=newP;
         particles_b[i]=newp2;
            particles_c[i]=newp3;

    }*/
    //noFill();
    
  

//var newP2 = new Particle(d, eyeL.y);
//ellipse(eyeR.x,eyeR.y,d);
  for(var i2 = 0; i2 < nums; i2++){
    
        var radius = map(i2,0,nums,1,pose.rightWrist.x/30);
        var radius2 = map(i2,0,nums,1,pose.leftWrist.x/30);
    var alpha = map(i2,0,nums,0,250);

             particles_a[i2].speed =d/100;
             particles_b[i2].speed =wristD/100;
         // particles_b[i2]=newP2;
                particles_a[i2].vel=createVector(wristD,pose.leftWrist.x);
    fill(red,100,blue,alpha);
     
    particles_a[i2].move();
    particles_a[i2].display(radius);
    particles_a[i2].checkEdge();

    fill(25,green,blue,alpha);
    particles_b[i2].move();
    particles_b[i2].display(radius);
    particles_b[i2].checkEdge();

    fill(255,255,255,alpha);
    particles_c[i2].move();
    particles_c[i2].display(radius2);
    particles_c[i2].checkEdge();
  }  
    /* beginShape();  
    /*  for(let i=0; i<rwcnt; i++){
     ellipse(rwx[i], rwy[i],12);
     }*/



    /*ellipse(pose.rightWrist.x, pose.rightWrist.y, pose.rightWrist.x*0.2);
     ellipse(pose.leftWrist.x, pose.leftWrist.y,pose.leftWrist.x*0.2);*/
    //  
    /* for (let i = 0; i < pose.keypoints.length; i++) {
     let x = pose.keypoints[i].position.x;
     let y = pose.keypoints[i].position.y;
     beginShape();
     vertex(x, y);
     endShape(CLOSE);
     }*/

    /* for (let i = 0; i < skeleton.length; i++) {
     let a = skeleton[i][0];
     let b = skeleton[i][0];
     strokeWeight(2);
     stroke(255);
     //line(a.position.x, a.position.y, b.position.x, b.position.y);
     beginShape();
     vertex(a.position.x, a.position.y);
     vertex( b.position.x, b.position.y);
     endShape(CLOSE);
     let kd= dist(a.position.x, a.position.y, b.position.x, b.position.y);
     rotate(kd);
     }*/

  }



  for (let i = 0; i < oscCount; i++) {
    allOscs[i].freq(random(10, wristD+440));
  }
}


function Particle(x, y){
  this.dir = createVector(0, 0);
  this.vel = createVector(-x,-y);
  this.pos = createVector(x, y);
  this.speed = 0.3;

  this.move = function(){
    var angle = noise(this.pos.x/noiseScale, this.pos.y/noiseScale)*TWO_PI*noiseScale;
    this.dir.x = cos(angle);
    this.dir.y = sin(angle);
    this.vel = this.dir.copy();
    this.vel.mult(this.speed);
    this.pos.add(this.vel);
  };

  this.checkEdge = function(){
    if(this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0){
      this.pos.x = random(10, width);
      this.pos.y = random(10, height);
    }
  };

  this.display = function(r){
    ellipse(this.pos.x, this.pos.y, r, r);
  };
}
