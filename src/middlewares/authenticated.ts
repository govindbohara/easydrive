/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import { UserModal } from '../models/user.model'
import { decodeJwtAsync } from '../utils/decode-jwt-async'

/**
 * @description Middleware that restricts access to certain routes to only logged in users.
 */
export const authenticated = async (req: Request, res: Response, next: NextFunction) => {
		const cookies = req.cookies as Record<string, string>
		const authorizationHeader = req.headers.authorization
		let token: string
		if (cookies && cookies.jwt) {
			token = cookies.jwt
		} else if (authorizationHeader && authorizationHeader.startsWith('Bearer')) {
			const [_, jwtToken] = authorizationHeader.split(' ')
			token = jwtToken
		} else {
			return next(new Error('You are not logged in'))
		}
		try {
			const { id } = await decodeJwtAsync<{ id: string }>(token)
			const user = await UserModal.findById(id)
			if (!user) return next(new Error('User not found'))
			req.user = user

			next()
		} catch (message: any) {
			next(new Error(message))
		}
	}
