import { Body, Controller, Delete, Inject, Post } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'
import { AuthServiceClient, AUTH_SERVICE_NAME, Tokens, RegisterRequest, LogoutRequest, RefreshTokensRequest, LoginRequest } from './auth.pb'

@Controller('/auth')
export class AuthController {

    private authService: AuthServiceClient

    @Inject(AUTH_SERVICE_NAME)
    private readonly client: ClientGrpc

    onModuleInit(): void {
        this.authService = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME)
    }

    @Post('/register')
    public async register(
        @Body() dto: RegisterRequest
    ): Promise<Tokens> {
        return firstValueFrom(this.authService.register(dto))
    }

    @Post('/login')
    public async login(
        @Body() dto: LoginRequest
    ): Promise<Tokens> {
        return firstValueFrom(this.authService.login(dto))
    }

    @Post('/refresh')
    public async refresh(
        @Body() dto: RefreshTokensRequest
    ): Promise<Tokens> {
        return firstValueFrom(this.authService.refresh(dto))
    }

    @Delete('/logout')
    public async logout(
        @Body() dto: LogoutRequest
    ): Promise<boolean> {
        return !!firstValueFrom(this.authService.logout(dto))
    }

}