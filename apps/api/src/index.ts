import "./scheduler/cronJobs";
import app from "./app";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
dotenv.config();

const PORT = process.env.PORT || 3000;

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

const users: { [key: string]: string } = {};
io.on("connection", (socket) => {
    console.log(`Pengguna terhubung: ${socket.id}`);
    socket.on("register", (userId: string) => {
        users[userId] = socket.id;
        console.log(`User terdaftar: ${userId} dengan socketId: ${socket.id}`);
    });
    socket.on("send_message", (data) => {
        const { recipientId, message, senderId } = data;
        const recipientSocketId = users[recipientId];
        if (recipientSocketId) {
            io.to(recipientSocketId).emit("receive_message", {
                senderId,
                message,
            });
            console.log(`Pesan dari ${senderId} ke ${recipientId}: ${message}`);
        } else {
            console.log(`Penerima dengan userId ${recipientId} tidak ditemukan.`);
        }
    });
    socket.on("disconnect", () => {
        const userId = Object.keys(users).find((key) => users[key] === socket.id);
        if (userId) {
            delete users[userId];
            console.log(`Pengguna terputus: ${userId}`);
        }
    });
});

httpServer.listen(PORT, () => {
    console.log(`Server berjalan pada port ${PORT}`);
});
