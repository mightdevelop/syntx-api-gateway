import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common'
import {
    Tokens,
    RegisterRequest,
    LogoutRequest,
    RefreshTokensRequest,
    LoginRequest
} from './auth.pb'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { AuthService } from './services/auth.service'

@Controller('/auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) {}

    @Post('/register')
    public async register(
        @Body() dto: RegisterRequest
    ): Promise<Tokens> {
        return this.authService.register(dto)
    }

    @Post('/login')
    public async login(
        @Body() dto: LoginRequest
    ): Promise<Tokens> {
        return this.authService.login(dto)
    }

    @Post('/refresh')
    public async refresh(
        @Body() dto: RefreshTokensRequest
    ): Promise<Tokens> {
        return this.authService.refresh(dto)
    }

    @Delete('/logout')
    @UseGuards(JwtAuthGuard)
    public async logout(
        @Body() dto: LogoutRequest
    ): Promise<boolean> {
        return !!this.authService.logout(dto)
    }

}