import { prisma as db } from '../../utils/db';

export const connectRoom = async (socket: any, io: any) => {
	socket.on('get-rooms', async (userId?: { userId: number }) => {
		const chats = await db.userGroup.findMany({
			where: {
				userId: userId?.userId!,
			},
			select: {
				groupId: true,
			},
		});

		socket.emit('joined-room', chats);
		socket.broadcast.emit('joined-room', chats);
	});
	socket.on('join-room', async (room?: { roomId: string }) => {
		socket.join(room?.roomId);
	});
};

export const createRoom = async (socket: any, io: any) => {
	socket.on('create-room', async (users?: { userId: number }[]) => {
		const group = await db.group.create({
			data: {},
			select: {
				id: true,
			},
		});
		if (Array.isArray(users)) {
			const userIds = users.map((user) => user.userId);

			const chat = await db.userGroup.createMany({
				data: userIds.map((userId) => ({
					userId,
					groupId: group.id,
				})),
			});

			console.log(chat, 'chat');

			const usersInChat = await db.user.findMany({
				where: {
					id: {
						in: userIds,
					},
				},
			});

			usersInChat.forEach((userId) => {
				if (userId.socketId) {
					io.to(userId.socketId).emit('created-room', 'room created');
				}
			});
		}
	});
};

export const leaveRoom = async (socket: any, roomId: string) => {
	await socket.leave(roomId);
};
