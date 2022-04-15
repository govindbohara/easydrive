import { PackageModel } from '../models/package.model';
import { catchAsync } from '../utils/catch-async';

export const createPackage = catchAsync(async (req, res, next) => {
	const newPackage = await PackageModel.create({ ...req.body });
	res.json(newPackage);
});

export const findAll = catchAsync(async (req, res, next) => {
	console.log('Logged in user is', req.user);
	const packages = await PackageModel.find();
	res.json(packages);
});

export const findOne = catchAsync(async (req, res, next) => {
	console.log('Logged in user is', req.user);
	const packages = await PackageModel.findById(req.params.packageid);
	res.json(packages);
});
