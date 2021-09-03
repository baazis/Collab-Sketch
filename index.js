var config = {
  apiKey: "AIzaSyDK3shS0xIjxMIPr_H9pYeTcKz6anuHjIc",
  authDomain: "collab-sketch-6209e.firebaseapp.com",
  databaseURL: "https://collab-sketch-6209e-default-rtdb.firebaseio.com",
  storageBucket: "collab-sketch-6209e.appspot.com",
};
// Replace the above with your own config from firebase account
firebase.initializeApp(config);

var pointsData = firebase.database().ref();
var points = [];

function setup() {
  var canvas = createCanvas(900, 900);
  background(240);
  fill(0);
  pointsData.on("child_added", function (point) {
    points.push(point.val());
  });
  canvas.mousePressed(drawPoint);

  // canvas.mouseMoved(function () {
  //   if (mouseIsPressed) {
  //     drawPoint();
  //   }
  // });
  canvas.mouseMoved(drawPointIfMousePressed);

}

function draw() {
  background(240);
  for (var i = 0; i < points.length; i++) {
    var point = points[i];
    ellipse(point.x, point.y, 5, 5);
  }
}

function drawPoint() {
  // alert("DON'T TOUCH THE MASTERPIECE! NO COLLABORATION!");
  pointsData.push({ x: mouseX, y: mouseY });
  return false;
}
function drawPointIfMousePressed() {
  if (mouseIsPressed) {
    drawPoint()
  }
}


$("#saveDrawing").on("click", saveDrawing);

function saveDrawing() {
  saveCanvas("Amazing Painting");
}

$("#clearDrawing").on("click", clearDrawing);

function clearDrawing() {
  // alert("HOW DARE YOU!");

  pointsData.remove();
  points = [];

}
