const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Initialize Express
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (like app.html)
app.use(express.static('public'));

// Serve the app.html file manually
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/app.html');
});

// Listen for Socket.IO connections
io.on('connection', (socket) => {
    console.log('New user connected');

    // Handle incoming messages from clients
    // Example of potential duplication
    socket.on('send-message', (data) => {
        console.log('Message received:', data);
        io.emit('receive-message', { user: data.sender, msg: data.msg });
    });

    // When the user disconnects
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});