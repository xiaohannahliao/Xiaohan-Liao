var diameter=300; 
var angle = 0;
var clientHeight;
var clientWidth;
function setup() {
 var clientHeight = document.getElementById('headerbackground').clientHeight;
  var clientWidth = document.getElementById('headerbackground').clientWidth;

  var cnv = createCanvas(clientWidth,clientHeight);
  cnv.parent("headerbackground");
  
 
}

function draw() {
  
  background(255,155);
  noStroke();


  var d1 = 10 + (sin(angle) * diameter/2) + diameter/2;
  var d2 = 10 + (sin(angle + PI/2) * diameter/2) + diameter/2;
  var d3 = 10 + (sin(angle + PI) * diameter/2) + diameter/2;
  
   fill(135, 206, 235,55);
  ellipse(0, height/2, d1, d1);
    fill(255, 127, 80,55);
  ellipse(400, height/2, (d1*d2)/500, (d1*d2)/500);

  fill(144, 238, 144,55);
  ellipse(width/2, height/2, d2, d2);
  fill(135, 206, 235,55);
  ellipse(width/2+400, height/2, (d2*d3)/500, (d2*d3)/500);
  fill(255, 127, 80,55);
  ellipse(width,height/2, d3, d3);

  fill(135, 206, 235);
  ellipse(mouseX,mouseY, d1/15, d1/15);
      fill(255, 127, 80);
  ellipse(mouseX+d1/15+2,mouseY+d1/15+2, d2/15, d2/15);
   fill(144, 238, 144,55);

ellipse(mouseX-d3/10+2,mouseY-d3/15+2, d3/15, d3/15);

  angle += 0.02;
}
