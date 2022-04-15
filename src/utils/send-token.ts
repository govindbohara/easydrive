import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'
import { COOKIE_EXPIRATION_DATE } from '../constants'

/**
 * @description Send a jwt accesstoken to the user
 */
export const sendToken = (userId: string, res: Response, next: NextFunction) => {
	try {
		const token = jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
			expiresIn: '30d',
		})
		res.cookie('jwt', token, {
			secure: process.env.NODE_ENV === 'production',
			httpOnly: true,
			expires: COOKIE_EXPIRATION_DATE,
		})
		res.status(200).json({
			accessToken: token,
		})
	} catch (e) {
		const error = e as Error
		next(new Error(error.message))
	}
}
