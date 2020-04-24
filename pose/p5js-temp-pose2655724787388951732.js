// ml5.js: Pose Estimation with PoseNet
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/Courses/ml5-beginners-guide/7.1-posenet.html
// https://youtu.be/OIo-DIOkNVg
// https://editor.p5js.org/codingtrain/sketches/ULA97pJXR

let video;
let poseNet;
let pose;
let skeleton;
let poseTable;
let posePos=[];
let portName ='/dev/tty.usbmodem143102';
let serial;
function setup() {
  createCanvas(320, 240);
  video = createCapture(VIDEO);
  video.size(320,240);
  frameRate(10);
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
  poseTable = new p5.Table();
  poseTable.addColumn('x');
  poseTable.addColumn('y');
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  /*serial.on('list', printList);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing

  serial.list();                      // list the serial ports*/
  serial.open(portName);              // open a serial port
  
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
  //image(video, 0, 0);

background(0);
frameRate(10);

  if (pose) {
    let eyeR = pose.rightEye;
    let eyeL = pose.leftEye;
    let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
    fill(255, 0, 0);
    ellipse(pose.nose.x, pose.nose.y, d);
    fill(0, 0, 255);
    ellipse(pose.rightWrist.x, pose.rightWrist.y, 32);
    ellipse(pose.leftWrist.x, pose.leftWrist.y, 32);
    var distan= dist(pose.leftWrist.x,pose.leftWrist.y,
         pose.rightWrist.x,pose.rightWrist.y);
           append(posePos,distan);
         fill(255,0,0);
         let t =millis()/1000;
         rect(0,300,t,300);
         let distScale = constrain(distan,0,300);
         fill(255);
        
         ellipse(t, distScale,1,1); 
         let newRow = poseTable.addRow();
       for(let i=0; i<posePos.length; i++){
       
        newRow.setNum('x', i);
        newRow.setNum('y', posePos[i]);
        
       }
         
    print(distan);
    var dis = createElement('p', distan);
    serial.write(distan);
    
    

    
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      fill(0,255,0);
      ellipse(x,y,16,16);
    }
    
    for (let i = 0; i < skeleton.length; i++) {
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      strokeWeight(2);
      stroke(255);
      line(a.position.x, a.position.y,b.position.x,b.position.y);      
    }
    

   
  
  
  }
}

function mousePressed(){
  
 saveTable(poseTable, "data/poseTable.csv");
}
