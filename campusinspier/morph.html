let sh

function setup() {
  createCanvas(1112, 834, WEBGL);
  sh = createShader(vert,frag);
  this.shader(sh);
  
}

function draw() {
  background('#202F5F');
  randomSeed(4);
  orbitControl();
  rotateY(frameCount * 0.001);
  noStroke();
  sh.setUniform("u_resolution", [width,height]);
  sh.setUniform("u_mouse",[mouseX,mouseY]);
  
  for(let i = 0; i <50; i++)
  {
    push();
    sh.setUniform("u_time", millis()*0.001+ i*0.1);
    translate(random(-width,width),random(-height/2,height/2),random(-height,height));
    sphere(min(width,height)*0.1);
    pop();
  }
  //ellipse(mouseX, mouseY, 20, 20);
}

function mousePressed(){
  save('pix.jpg');
}