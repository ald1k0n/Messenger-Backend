import { config } from 'dotenv';
import { createServer } from 'http';
import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import { onConnect, onDisconnect } from './sockets/onConnect';
import { connectRoom, createRoom } from './sockets/handlers/roomHandlers';
import { onEditMessage, sendMessage } from './sockets/handlers/messageHandler';

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
app.use('/uploads', express.static('./uploads'));

app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/upload', require('./routes/fileUploadTest'));

/*
  must listen events: 
    created-room, joined-room, receive-message, update-message
  to make something: 
    online - to update a new socketId, create-room - to create room
    disconnect - send onDisconnect in client side event to disconnect
		create-room - to create a new group 
		send-message - to send message
		edit-message - edit a sended message in a group
	to join room:
	  join-room with roomId
*/

io.on('connection', async (socket) => {
	console.log(`Connected to socket with id ${socket.id}`);
	socket.on('online', async (userId: number) => {
		await onConnect(socket, io, socket.id, userId);
	});
	await createRoom(socket, io);
	await connectRoom(socket, io);
	await sendMessage(socket, io);
	await onEditMessage(socket, io);
	socket.on('disconnect', async (userId) => {
		await onDisconnect(socket, io, socket.id, userId);
	});
});

server.listen(8080, () => {
	console.log('Server has started at port 8080');
});
