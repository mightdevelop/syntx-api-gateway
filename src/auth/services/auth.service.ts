import { Inject, Injectable } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'
import {
    AuthServiceClient,
    AUTH_SERVICE_NAME,
    LoginRequest,
    LogoutRequest,
    RefreshTokensRequest,
    RegisterRequest,
    Tokens,
} from '../auth.pb'

@Injectable()
export class AuthService {

    private authService: AuthServiceClient

    @Inject(AUTH_SERVICE_NAME)
    private readonly client: ClientGrpc

    onModuleInit(): void {
        this.authService = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME)
    }

    public async register(
        dto: RegisterRequest
    ): Promise<Tokens> {
        return firstValueFrom(this.authService.register(dto))
    }

    public async login(
        dto: LoginRequest
    ): Promise<Tokens> {
        return firstValueFrom(this.authService.login(dto))
    }

    public async refresh(
        dto: RefreshTokensRequest
    ): Promise<Tokens> {
        return firstValueFrom(this.authService.refresh(dto))
    }

    public async logout(
        dto: LogoutRequest
    ): Promise<boolean> {
        return !!firstValueFrom(this.authService.logout(dto))
    }
}