import { Messages } from '@prisma/client';
import { prisma as db } from '../../utils/db';

export const sendMessage = async (socket: any, io: any) => {
	socket.on('send-message', async (messageObj: Messages) => {
		if (messageObj.groupId === '') return;
		else {
			const message = await db.messages.create({
				data: messageObj,
			});
			await socket.to(message.groupId).emit('receive-message', message);
		}
	});
};

export const onEditMessage = async (socket: any, io: any) => {
	socket.on('edit-message', async (messageObj: Messages) => {
		if (messageObj.groupId === '') {
			return;
		} else {
			const message = await db.messages.update({
				where: {
					groupId: messageObj.groupId,
					id: messageObj.id,
				},
				data: messageObj,
			});
			socket.to(message.groupId).emit('update-message', message);
		}
	});
};
