import { User, UserModal } from '../models/user.model';
import { LoginPayload } from '../typings/user';
import { catchAsync } from '../utils/catch-async';
import { sendToken } from '../utils/send-token';

export const login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body as LoginPayload;
	if (!email || !password) {
		return next(new Error('Please provide email and password'));
	}
	const user = await UserModal.findOne({ email });
	if (!user) return next(new Error('User not found'));
	if (!(await user.comparePassword(password)))
		return next(new Error('Invalid email or password'));
	req.user = user;
	sendToken(user.id, res, next);
});
export const signup = catchAsync(async (req, res, next) => {
	const { firstName, lastName, email, password } = req.body as User;
	const user = await UserModal.create({ firstName, lastName, email, password });
	sendToken(user.id, res, next);
});
export const profile = catchAsync(async (req, res, next) => {
	res.json(req.user);
});
export const updateProfile = catchAsync(async (req, res, next) => {
	const updatedUser = await UserModal.findByIdAndUpdate(
		req.user?._id,
		{ ...req.body },
		{ new: true }
	);
	res.json(updatedUser);
});
