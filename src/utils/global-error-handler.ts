import { NextFunction, Response, Request } from 'express'

export const globalErrorHandler = (
	error: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.status(500).send({
		status: 'error',
		message: error.message,
	})
}
