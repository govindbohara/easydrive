import { Router } from 'express';
import {
	createCheckout,
	createSubscribtion,
	findSubscriptions,
	webHooks,
} from '../controllers/subscription.controller';
import { authenticated } from '../middlewares/authenticated';

const subscriptionRouter = Router();

subscriptionRouter.post('/', authenticated, createSubscribtion);
subscriptionRouter.get('/', authenticated, findSubscriptions);
subscriptionRouter.post('/checkout/:packageId', authenticated, createCheckout);
subscriptionRouter.post('/webhooks', webHooks);
export default subscriptionRouter;
