const socketIo = require('socket.io');
const taskSocketHandler = require('./taskSocketHandler'); // Adjust the path if necessary

const setupWebSocket = (server) => {
    const io = socketIo(server, {
        cors: {
            origin: "http://localhost:3000", // Adjust to your front-end URL
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('New Client connected', socket.id);

        taskSocketHandler(socket); // Setup task-related WebSocket events

        socket.on('disconnect', () => {
            console.log('Client disconnected', socket.id);
        });
    });

    return io;
};

module.exports = setupWebSocket;
