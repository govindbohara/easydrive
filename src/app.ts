import dotenv from 'dotenv';
import Express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { globalErrorHandler } from './utils/global-error-handler';

import userRouter from './routes/user.routes';
import packageRouter from './routes/package.routes';
import subscriptionRouter from './routes/subscription.routes';

dotenv.config();

const app = Express();
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}
app.use(cookieParser());
app.use('/subscriptions/webhooks', Express.raw({ type: '*/*' }));
app.use(Express.json({ limit: '10kb' }));
app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	})
);

app.use('/users', userRouter);
app.use('/packages', packageRouter);
app.use('/subscriptions', subscriptionRouter);

// middleware for handling global errors
app.use(globalErrorHandler);
export default app;
