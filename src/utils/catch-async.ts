import { NextFunction, Request, Response } from 'express'

type AsynFunc = (req: Request, res: Response, next: NextFunction) => Promise<void>

export const catchAsync = (fn: AsynFunc) => {
	return (req: Request, res: Response, next: NextFunction) => {
		fn(req, res, next).catch(next)
	}
}
