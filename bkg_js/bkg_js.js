var angle =0.0;
var diameter = 0.0;
var  n = 256;//
var minRad = 25;
var maxRad = 500;
var nfAng = 0.0289;//change this to get new shape
var  nfTime =0.0137;
function setup() {
  createCanvas(displayWidth, displayHeight);
  background(0); 
  //colorMode(HSB);
  smooth();
} 

function draw() {
  var j =0;
  background(255);
  translate(displayWidth/2, displayHeight/2);
//noFill();
  beginShape();
  //push();
  for (var i =0; i< displayWidth; i+=0.1) {  
   // drawFlower(-i, i, 50);
    //rotate(sin(i+mouseX)*cos(i+mouseX)+cos(mouseX/10));


   
    var ang = map(i, 0, n, 0, 3*PI);
    var rad = map(noise(mouseX*i*nfAng, frameCount*nfTime), 0, 1.1, minRad, maxRad);
    var x = rad * cos(ang);
    var y = rad * tan(ang);
    //  drawFlower(x, y, 15);
   // fill(255);
   alpha(120);
    stroke(i,100,100);
    strokeWeight(0.2);
    //nnoStroke();
     noFill();
   arc(noise(mouseX,x*2), y*2, i/2,i/2,PI,PI*3);
 arc(x, y, i/2,i/2,HALF_PI,PI*i);
 // arc(-x, -y, i,i,HALF_PI,PI*3);
     // arc(x+i, y+i, i,i,HALF_PI,PI*3);
         //   arc(x+i/2, y+i/2, i,i,PI,PI*3);
   //  arc(x+i, y+i, i,i,PI,PI*2);
  //rotate(sin(x)*frameCount);
  }
  endShape();
  
 //pop();
  angle+=0.002;
}
