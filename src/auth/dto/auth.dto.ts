import { IsEmail, IsString, MinLength } from 'class-validator'

export class AuthDto {
	@IsEmail()
	email: string

	@MinLength(8, {
		message: 'Password is too short. Minimal length is characters'
	})
	@IsString()
	password: string
}

export class RefreshDto {
	@IsString()
	refresh_token: string
}
