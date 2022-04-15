import { verify } from 'jsonwebtoken'
import { getEnv } from './get-env'

type CommonPayload = {
	iat: number
	exp: number
}
type DecodedPayload<T> = CommonPayload & T

/**
 * @description Asynchronously decode a JWT token
 */
export const decodeJwtAsync = async <T>(
	token: string
): Promise<DecodedPayload<T>> => {
	// decode the token
	return new Promise((resolve, reject) => {
		verify(token, getEnv('JWT_SECRET'), (error, decoded) => {
			if (error) reject(error.message)
			resolve(decoded as DecodedPayload<T>)
		})
	})
}
