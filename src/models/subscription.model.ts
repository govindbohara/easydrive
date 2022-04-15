import { getModelForClass, pre, prop, Ref } from '@typegoose/typegoose';
import { addDays } from 'date-fns';
import { Package } from './package.model';
import { User } from './user.model';

@pre<Subscription>('find', function (this) {
	this.populate('user');
	this.populate('package');
})
export class Subscription {
	@prop({ ref: 'Package', required: [true, 'Package is required'] })
	package: Ref<Package>;

	@prop({ ref: 'User', required: [true, 'User is required'] })
	user: Ref<User>;

	@prop({ default: new Date() })
	subscribedAt: Date;

	@prop({ required: [true, 'Expiry Date Missing'] })
	expiresAt: Date;

	@prop({ required: [true, 'Time is required'] })
	time: string;
}
export const SubscriptionModel = getModelForClass(Subscription);
