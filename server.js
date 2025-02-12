const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("Клиент подключился:", socket.id);

    socket.on("message", (data) => {
        console.log(" Получено сообщение:", data);
        socket.emit("response", `Эхо: ${data}`);
    });

    socket.on("disconnect", () => {
        console.log(" Клиент отключился:", socket.id);
    });
}); 

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`🚀 Сервер работает на порту ${PORT}`);
});