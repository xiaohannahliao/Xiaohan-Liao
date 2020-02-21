var angle =0.0;
var diameter = 0.0;
var  n = 256;//
var minRad = 15;
var maxRad = 100;
var nfAng = 0.0289;//change this to get new shape
var  nfTime =0.0137;
function setup() {
 var clientHeight = document.getElementById('headerbackground').clientHeight;
  var clientWidth = document.getElementById('headerbackground').clientWidth;

  var cnv = createCanvas(clientWidth,clientHeight);
  cnv.parent("headerbackground");
  background(255);
} 

function draw() {
  var j =0;
  background(255);

  translate(width/2,height/2);
  scale(0.25);
//noFill();
  beginShape();

  //push();
  for (var i =0; i< displayWidth/4; i+=0.5) {  
   // drawFlower(-i, i, 50);
    //rotate(sin(i+mouseX)*cos(i+mouseX)+cos(mouseX/10));


   
    var ang = map(i, 0, n, 0, 3*PI);
    var rad = map(noise(i*nfAng, frameCount/2*nfTime), 0, 1.1, minRad, maxRad);
    var x = rad * cos(ang);
    var y = rad * sin(ang);
    //  drawFlower(x, y, 15);
   // fill(255);
   alpha(100);
    stroke(0,150,255,100);
    strokeWeight(1.2);
    //nnoStroke();
   //  noFill();
  fill(0,150,255,100);
 //arc(mouseX/2, mouseY/2, i/2,i/2,HALF_PI,PI*i);
  //arc(-x*i,y*i,i,i,HALF_PI,PI*3);
     // arc(x+i/3, y+i/3, i,i,HALF_PI,PI*3);
         //   arc(x+i/2, y+i/2, i,i,PI,PI*3);
         ellipse(x+i/100+i-mouseX*i/200,y*i/200+10-mouseY,20,20);
         ellipse(x+i/5,y+i/5,10,10);
        //line(10,10,x+i/12+mouseX,y+i/12+mouseY);

       //ellipse(x+i/100+,y+i/200+10,20,20);
       //  ellipse(mouseX/2, mouseY/2,i,i);
        // fill(i,i,150,20);
  //arc(-x*i, y*i, i,i,PI,PI*2);
rotate(cos(x/1500)+sin(y/2000));

  }
  endShape();
  
 //pop();
 //arc(x*i, -y*i, i/2,i/2,HALF_PI,PI*2);
}
