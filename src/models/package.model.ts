import { getModelForClass, prop } from '@typegoose/typegoose';

export class Package {
	@prop({ required: [true, 'Package name is required'] })
	name: string;

	@prop({
		required: [true, 'Vehicle type is required'],

		enum: ['two-wheeler', 'four-wheeler'],
	})
	type: string;

	@prop({ required: [true, 'Package price is required'], min: 0 })
	price: number;

	@prop({ required: [true, 'Package number of days is required'], min: 1 })
	numOfDays: number; // day

	@prop({ required: [true, 'Package description is required'] })
	description: string;
}
export const PackageModel = getModelForClass(Package);
