//this is the tracker component - it's just a black box don't worry about it
var ctracker;

/* 
if sound doesn't work click the gear button an select run in browser ON
*/
let sum;
let avg;
let button;
let button1;
let button2;
let buttpn3;
var mic;
var volume = 0;
let osc;
let smilesPos = [];
let starTrack = false;
let soundRecord;
let recorder;
let isStop;
let isPlayback;
let cnv;
var metronomeSound; // sound object
let reverb;
let oscEnv;
let pan3D;
let pitches =[60, 64, 67, 72];
let delay;
let panningpos;
let noiseMax = 0.01;
let goal = 5;

let start = 0;
let z = 0;

let posM;
let lastM;
function setup() {
  // setup camera capture

  cnv = createCanvas(windowWidth, windowHeight);
  cnv.position(0, 0);
  cnv.scale(-1.0, 1.0);
  // setup tracker

  mic = new p5.AudioIn();
  //osc = new p5.Oscillator();
  //osc.start();
  recorder = new p5.SoundRecorder();
  soundRecord = new p5.SoundFile();
  ctracker = new clm.tracker();
  osc = new p5.Oscillator('sine');
//  osc = new p5.PolySynth();
reverb = new p5.Reverb();
  oscEnv= new p5.Envelope();
   pan3D = new p5.Panner3D();

  button = createButton('Start to Record');
 // button1 = createButton('Stop');
  //button2 = createButton('Save');
  button3 = createButton('Playback and Save');
  button.position(19, 19);
  button3.position(19, 19 + 30);
 // button2.position(19, 19 + 60);
  //button3.position(19, 19 + 90);

  button.mousePressed(startRecord);
  //button1.mousePressed(stopNote);
 // button2.mousePressed(savesound);
 //button3.mousePressed(playBack);
button3.mousePressed(playBack);


  fill(255);
  textSize(32);
    background(0);





}

function draw() {

  background(0);
  //text("Listen to your smile", width/2, height/2);
  if (starTrack) {
    var detectionScore = ctracker.getScore();

    if (detectionScore > 0) {

      var positions = ctracker.getCurrentPosition();


      for (var i = 0; i < positions.length; i++) {
        var leftEyeX = positions[32][0];
        var leftEyeY = positions[32][1];
        var leftMouthX = positions[44][0];
        var leftMouthY = positions[44][1];
        var rightMouthX = positions[50][0];
        var rightMouthY = positions[50][1];



        var rightEyeX = positions[27][0];
        var rightEyeY = positions[27][1];

        var noseX = positions[62][0];
        var noseY = positions[62][1];


        var faceLeftX = positions[1][0];
        var faceLeftY = positions[1][1];
        var faceRightX = positions[13][0];
        var faceRightY = positions[13][1];
   
        

        var size = dist(faceLeftX, faceLeftY, faceRightX, faceRightY);
        
        let smilesize = dist(leftMouthX, leftMouthY, rightMouthX, rightMouthY);
        let constrainNosex = constrain(noseX, 10, width-10);
    
    panningpos = map(constrainNosex, 10.0, width-10, -1.0, 1.0);
        
    console.log(panningpos );

        smilesPos.push(smilesize);
     playNote(smilesize*5,panningpos);
           //  playNote(leftEye*5,panningpos);

        
       
        noFill();
        stroke(250);

       // ellipse(positions[i][0], positions[i][1], 4, 4);
        push();
        translate(width/2,height/2);
        ellipse(-noseX/5,0,smilesize*2,smilesize*2);
        textSize(12);
        text("Smile or Move your head to Enlarge the Circle",-30,-200,250,200);
       pop();
 
      }
   
    }
   
  }
  
}

function startRecord() {
  /* start to track facial expression 
   * draw face(shapes) on canvas 
   * allow audiences listent to their smiles */
  var videoInput = createCapture(VIDEO);
  videoInput.size(windowWidth, windowHeight);
  videoInput.position(0, 0);

  videoInput.hide();

  starTrack = true;
  
  ctracker.init(pModel);

  ctracker.start(videoInput.elt);

  osc.amp(0);
  osc.start();

  mic.start();
  recorder.setInput(osc);
  recorder.record(soundRecord);
  

 
}

function playNote(notes, panning) {
   // userStartAudio();
osc.amp(0.5);
  soundRecord.stop();
  let note = constrain(notes, 100,400)
osc.freq(notes);
  osc.pan(panning);
 setBPM(30,0);
// osc.triggerRelease();
 // osc.connect(panner);


//oscEnv.ramp(osc,0,1.0,0); 
  
  
}



function playBack() {
  //clear();
 // osc.noteRelease();
  starTrack = false;
  recorder.stop();
  soundRecord.setVolume(1);
 osc.stop();
   const x = Math.sin(frameCount);
  const y = Math.cos(frameCount);
// oscEnv.process(soundRecord);
let z = map(frameCount, 0,1000,-10,100)
 pan3D.set(x, y, z);
pan3D.process(soundRecord);
  //oscEnv.process(soundRecord);
 reverb.process(soundRecord);
  soundRecord.play();
  savesound();

  
}


function savesound() {

  saveSound(soundRecord, 'test.wav');
  starTrack = false;
}



