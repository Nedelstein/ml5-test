// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using MobileNet and p5.js
This example uses a callback pattern to create the classifier
=== */

let classifier;
let video;
var canvas;
var xOrig;
var yOrig;
var xMid;
var yMid;
var xWidth;
var yHeight;

var rectX;
var rectY;
var objectName;

function setup() {

  canvas = createCanvas(windowWidth,windowHeight);
  background(0);

  xOrig = 0;
  yOrig = 0;
  xMid = windowWidth/2;
  yMid = windowHeight/2;
  xWidth = windowWidth;
  yHeight = windowHeight;

  video = createCapture(VIDEO);

  //hiding the video so we can use the window as our canvas 
  video.hide();

  // Initialize the Image Classifier method with MobileNet and the video as the second argument
  classifier = ml5.imageClassifier('MobileNet', video, modelReady);  
   rectX = random(xOrig, xMid);
   rectY = random(yOrig, yMid);
}


function rectangle(){
    fill(255, 204, 0);
    rect(rectX,rectY, 80, 80);
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function modelReady() {
  // Change the status of the model once its ready
  select('#status').html('Model Loaded');
  // Call the classifyVideo function to start classifying the video
  classifyVideo();
}

// Get a prediction for the current video frame 
function classifyVideo() {
  classifier.predict(gotResult);
}

// When we get a result
function gotResult(err, results) {
  // The results are in an array ordered by probability.
  select('#result').html(results[0].className);
  select('#probability').html(nf(results[0].probability, 0, 2));
  classifyVideo();
  // console.log(results);

  let objectName = results[0].className;
  console.log(objectName);
  // return objectName;
}

///move the rectangle to  random spot if a notebook is read by ml5 --not working
function moveRect(){
      if (objectName == "notebook") {
      rectX = random(windowWidth);
      rectY = random(windowHeight);
  }
}

function draw(){
  rectangle();
  moveRect();
}

  

