
const { Server } = require("socket.io");

const io = new Server(3001, {
    cors: {
        origin: "*", // Allow all origins for dev simplicity
        methods: ["GET", "POST"]
    }
});

console.log("Chat server running on port 3001");

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("chat-message", (data) => {
        // Broadcast the message to all connected clients (including sender)
        io.emit("chat-message", data);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    });
});
