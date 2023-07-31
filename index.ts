import { config } from "dotenv";
import { createServer } from "http";
import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import { onConnect } from "./sockets/onConnect";
import { createRoom } from "./sockets/handlers/roomHandlers";

config();
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.ORIGIN!,
  },
  serveClient: false,
});
app.use(
  cors({
    origin: [process.env.ORIGIN!],
  })
);
app.use(express.json());
app.use("/uploads", express.static("./uploads"));

app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/upload", require("./routes/fileUploadTest"));

io.on("connection", async (socket) => {
  console.log(`Connected to socket with id ${socket.id}`);
  socket.on("online", async (currentUserId: number) => {
    await onConnect(socket, io, socket.id, currentUserId);
  });
  await createRoom(socket, io);
});

server.listen(8080, () => {
  console.log("Server has started at port 8080");
});
