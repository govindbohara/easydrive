import { SubscriptionModel } from '../models/subscription.model';
import { catchAsync } from '../utils/catch-async';
import Stripe from 'stripe';
import { PackageModel } from '../models/package.model';
import fs from 'fs';
import path from 'path';
import { UserModal } from '../models/user.model';
import { addDays } from 'date-fns';

export const createSubscribtion = catchAsync(async (req, res, next) => {
	// const packages = await SubscriptionModel.find({ time: req.body.time });

	// if (packages.length > 3) {
	// 	return next(new Error('The time you selected is busy. Please select other time. '));
	// }
	// const subscriptionAlreadyExists = await SubscriptionModel.findOne({
	// 	user: req.user?._id,
	// 	package: req.body.package._id,
	// });
	// console.log(req.body.package.type);

	// // console.log(`hello world ${subscriptionAlreadyExists}`);
	// // console.log(req.user);

	// if (subscriptionAlreadyExists) {
	// 	return next(new Error('You already have a subscription'));
	// }

	const newSubscription = await SubscriptionModel.create({
		...req.body,
		user: req.user,
		expiresAt: addDays(new Date(), req.body.package.numOfDays),
	});

	res.json(newSubscription);
});

export const findSubscriptions = catchAsync(async (req, res, next) => {
	console.log(req.user);

	const subscription = await SubscriptionModel.find({
		user: req.user?._id,
	});
	res.json(subscription);
});
export const createCheckout = catchAsync(async (req, res, next) => {
	// const packages = await SubscriptionModel.find({ time: req.body.time });

	// if (packages.length > 3) {
	// 	return next(new Error('The time you selected is busy. Please select other time. '));
	// }
	// const subscriptionAlreadyExists = await SubscriptionModel.findOne({
	// 	user: req.user?._id,
	// 	package: req.body.package._id,
	// });
	// console.log(req.body.package.type);

	// // console.log(`hello world ${subscriptionAlreadyExists}`);
	// // console.log(req.user);

	// if (subscriptionAlreadyExists) {
	// 	return next(new Error('You already have a subscription'));
	// }

	const packageId = req.params.packageId;
	console.log(packageId);

	const _package = await PackageModel.findById(packageId);
	console.log(_package);

	if (!_package) {
		return next(new Error('Package Not Found'));
	}
	const stripe = new Stripe(
		'sk_test_51KjMORFXaAQEXLLtCQMrwtxrQG8YpV98OGjocKIx47TxEtMBGTkyZILHfFERXIrjiFWTtUWFelWGacn7n457xdqb00XcysI5CI',
		{ apiVersion: '2020-08-27' }
	);
	const session = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		customer_email: req.user?.email,
		success_url: `http://localhost:3000/Home?packagename=${_package.name}`,
		cancel_url: 'http://localhost:3000/packages',
		client_reference_id: _package._id.toString(),
		metadata: { ...req.body },
		line_items: [
			{
				name: _package.name,
				amount: _package.price * 100,
				description: _package.description,
				currency: 'usd',
				quantity: 1,
			},
		],
	});
	res.send(session);
});
export const webHooks = catchAsync(async (req, res, next) => {
	const signature = req.headers['stripe-signature'] as string;
	const stripe = new Stripe(
		'sk_test_51KjMORFXaAQEXLLtCQMrwtxrQG8YpV98OGjocKIx47TxEtMBGTkyZILHfFERXIrjiFWTtUWFelWGacn7n457xdqb00XcysI5CI',
		{ apiVersion: '2020-08-27' }
	);
	const event = stripe.webhooks.constructEvent(
		req.body,
		signature,
		'whsec_3d80290e0bd62db344a19cf95cb4bc301c2c1806eeeec7f422c6f99a362e8297'
	);
	if (event.type === 'checkout.session.completed') {
		const { customer_email, client_reference_id, metadata } = event.data
			.object as Stripe.Checkout.Session;
		const user = await UserModal.findOne({ email: customer_email });
		const _package = await PackageModel.findById(client_reference_id);
		if (!user) {
			return next(new Error('User Not Found'));
		}
		if (!_package) {
			return next(new Error('Package Not Found'));
		}
		const startDate = new Date();
		const endDate = addDays(startDate, _package.numOfDays);
		fs.writeFileSync(
			path.join(process.cwd(), 'data.json'),
			JSON.stringify(event.data.object, null, 4),
			'utf-8'
		);
		try {
			const subscription = await SubscriptionModel.create({
				user: user._id,
				package: _package._id,
				time: metadata?.time,
				expiresAt: endDate,
			});
			console.log(subscription);
		} catch (error) {
			console.log(error);
		}
	}
});
