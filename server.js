let express = require('express');
// Create the app
let app = express();

// Set up the server
// process.env.PORT is related to deploying on heroku
let server = app.listen(process.env.PORT || 3000, 
        listen = () => {
        let host = server.address().address;
        let port = server.address().port;
        console.log('Example app listening at http://' + host + ':' + port);
      }
    );

// This call back just tells us that the server has started


app.use(express.static('public'));


// WebSocket Portion
// WebSockets work with the HTTP server
let io = require('socket.io')(server);

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection',
  // We are given a websocket object in our function
  newConnection = (socket) => {
  
    console.log("We have a new client: " + socket.id);
  
    // When this user emits, client side: socket.emit('otherevent',some data);
    socket.on('mouse',
      emitMouse = (data) => {
        // Send it to all other clients
        socket.broadcast.emit('mouse', data);
        
        // This is a way to send to everyone including sender
        // io.sockets.emit('message', "this goes to everyone");
      });
    
    socket.on('disconnect', function() {
      console.log("Client has disconnected");
    });
  }
);