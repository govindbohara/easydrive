import { getModelForClass, Prop, pre } from '@typegoose/typegoose';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../constants';
import { compare, hash } from 'bcryptjs';
@pre<User>('save', async function (next) {
	this.password = await hash(this.password, 12);
	next();
})
export class User {
	@Prop({ required: [true, 'Firstname is required'] })
	public firstName: string;

	@Prop({ required: [true, 'LastName is required'] })
	public lastName: string;

	@Prop({
		required: [true, 'Email address is required'],
		validate: {
			validator(email: string) {
				return EMAIL_REGEX.test(email);
			},
			message: '{VALUE} is not a valid email address',
		},
	})
	public email: string;

	@Prop({
		required: [true, 'Password is required'],
		validate: {
			validator(password: string) {
				return PASSWORD_REGEX.test(password);
			},
			message: 'Password is too weak',
		},
	})
	public password: string;

	public async comparePassword(rawPassword: string): Promise<boolean> {
		try {
			const isMatch = await compare(rawPassword, this.password);
			return isMatch;
		} catch (error) {
			return false;
		}
	}
}
export const UserModal = getModelForClass(User);
