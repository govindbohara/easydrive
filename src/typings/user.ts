export interface IUser {
	firstName: string
	lastName: string
	email: string
	password: string
}
export type LoginPayload = Pick<IUser, 'email' | 'password'>
