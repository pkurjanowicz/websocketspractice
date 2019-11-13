// Keep track of our socket connection
var socket;

setup = () => {
  createCanvas(400, 400);
  background(0);
  // Start a socket connection to the server
  // Some day we would run this server somewhere else
  socket = io.connect('http://localhost:3000');
  // We make a named event called 'mouse' and write an
  // anonymous callback function
  socket.on('mouse',
    // When we receive data
    drawAgain = (data) => {
      // Draw a blue circle
      fill(255,0,100);
      noStroke();
      ellipse(data.x, data.y, 15, 15);
    }
  );
}

mouseDragged = () => {
  // Draw some white circles
  fill(255);
  noStroke();
  ellipse(mouseX,mouseY,15,15);
  // Send the mouse coordinates
  sendmouse(mouseX,mouseY);
}

// Function for sending to the socket
sendmouse = (xpos, ypos) => {
  // Make a little object with  and y
  let data = {
    x: xpos,
    y: ypos
  };

  // Send that object to the socket
  socket.emit('mouse',data);
}