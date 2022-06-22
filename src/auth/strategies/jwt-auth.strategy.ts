import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserFromRequest } from '../types/user-from-request'
import { AccessTokenPayload } from '../types/access-token-payload'
import { UsersService } from 'src/users/services/users.service'
import 'dotenv/config'
import { User } from 'src/users/users.pb'

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private usersService: UsersService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
        })
    }
    async validate(payload: AccessTokenPayload): Promise<UserFromRequest> {
        const user: User = await this.usersService.getUserById({ userId: payload.id })
        if (!user)
            throw new UnauthorizedException()
        const { id, username, email }: UserFromRequest = user
        return { id, username, email }
    }
}