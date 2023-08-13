import { prisma as db } from '../utils/db';

export const onConnect = async (
	socket: any,
	io: any,
	socketId: string,
	currentId: any
) => {
	if (!Array.isArray(currentId)) {
		await db.user.update({
			where: {
				id: currentId.userId,
			},
			data: {
				socketId,
				isOnline: true,
			},
		});
	}

	socket.broadcast.emit(socketId, 'Connected to messenger');
};

export const onDisconnect = async (
	socket: any,
	io: any,
	socketId: string,
	currentId: any
) => {
	await db.user.update({
		where: {
			id: currentId.userId,
		},
		data: {
			isOnline: false,
		},
	});
};
