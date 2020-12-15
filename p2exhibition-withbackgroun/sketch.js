let a = 30; //Seitenlänge der Boxen (= Grösse der Simulation)
let boxes = 20; //Anzahl Boxen pro Seite (Reduziert Leistung durchschnittlich um n^3)
let reader = 0.1; 
let threshold = 0.6; //Schwellenwert des Noise-Wertes für die Anzeige der Box
let color;
let noiseValue;
let filter;
let angle;
let c;

let bksketch =function(s) {
 s.setup=function() {
	let c=s.createCanvas(s.windowWidth, s.windowHeight,s.WEBGL);
	c.position(0,0,-1);
  //c.parent('content');
	s.angleMode(s.DEGREES);
	s.frameRate(60);
	s.stroke(s.random(100,250),200,200,40);
	//s.noFill();
	s.translate(-680, -400, -1000);
	//console.log(boxes*boxes*boxes + " boxes");
	
}

s.draw=function() {
	s.clear();
	/*s.rotateX(-s.frameCount/12);
	s.rotateY(-s.frameCount/12);*/
	//lights();
	s.ambientLight(200); 
	s.noFill();
	s.rotateX(-s.winMouseX/12);
	s.rotateY(-s.winMouseY/12+s.frameCount/20);
	s.rotateZ(+s.frameCount/20);

  let bd = s.map(s.winMouseX, 0, s.windowWidth,800,100);
  let sw = s.map(s.winMouseX, 0, s.windowWidth,0.3,1);
  s.strokeWeight(sw);
	for (let z = 0; z < boxes; z+=5) {
		for (let y = 0; y < boxes; y+=3) {
			for (let x = 0; x < boxes; x+=1) {
				noiseValue = s.noise(x*reader, y*reader, z*reader);
				if (noiseValue <= threshold) {
					noiseValue = 0;
				} else {
					//fill(255, 255, 255, 0);
					s.push();
					s.translate(x*a-(boxes*a)/2, y*a-(boxes*a)/2, z*a-(boxes*a)/2);
					s.box(bd);
					s.pop();
				}
			}
		}
	}
  
}
s.windowResized=function(){

  s.resizeCanvas(s.windowWidth, s.windowHeight);
}

};

  new p5(bksketch);
