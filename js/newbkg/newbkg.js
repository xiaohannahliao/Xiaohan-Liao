var diameter; 
var angle = 0;

function setup() {
 var clientHeight = document.getElementById('headerbackground').clientHeight;
  var clientWidth = document.getElementById('headerbackground').clientWidth;

  var cnv = createCanvas(clientWidth,clientHeight);
  cnv.parent("headerbackground");
  background(255);
}

function draw() {
  
  background(0);

  var d1 = 10 + (sin(angle) * diameter/2) + diameter/2;
  var d2 = 10 + (sin(angle + PI/2) * diameter/2) + diameter/2;
  var d3 = 10 + (sin(angle + PI) * diameter/2) + diameter/2;
  
  ellipse(0, height/2, d1, d1);
  ellipse(width/2, height/2, d2, d2);
  ellipse(width, height/2, d3, d3);
  
  angle += 0.02;
}
