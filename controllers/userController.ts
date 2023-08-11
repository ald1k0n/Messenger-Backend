import { signAccessToken } from './../utils/jwt';
import { Response, Request } from 'express';
import bcrypt from 'bcryptjs';
import { prisma as db } from '../utils/db';

export const createUser = async (req: Request, res: Response) => {
	const { username, password } = req.body;
	try {
		const user = await db.user.create({
			data: {
				username,
				password: bcrypt.hashSync(password, 8),
			},
		});
		res.status(201).json(user);
	} catch (error) {
		console.log(error);
		res.status(400).json({
			message: 'User with that username already exists',
		});
	}
};

export const loginUser = async (req: Request, res: Response) => {
	const { username, password } = req.body;
	try {
		const user = await db.user.findUnique({
			where: {
				username,
			},
		});
		if (!bcrypt.compareSync(password, user?.password!)) {
			res.sendStatus(401);
		} else {
			const accessToken = await signAccessToken(user);
			res.status(200).json({
				...user,
				accessToken,
			});
		}
	} catch (error) {
		res.sendStatus(500);
	}
};
