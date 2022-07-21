import { Inject, Injectable } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'
import {
    DeleteUserRequest,
    UpdateUserRequest,
    User,
    UsersServiceClient,
    USERS_SERVICE_NAME,
    USERS_PACKAGE_NAME,
    UserId,
} from '../users.pb'

@Injectable()
export class UsersService {

    private usersService: UsersServiceClient

    @Inject(USERS_PACKAGE_NAME)
    private readonly client: ClientGrpc

    onModuleInit(): void {
        this.usersService = this.client.getService<UsersServiceClient>(USERS_SERVICE_NAME)
    }

    public async getUserById(
        dto: UserId
    ): Promise<User> {
        return firstValueFrom(this.usersService.getUserById(dto))
    }

    public async updateUser(
        dto: UpdateUserRequest
    ): Promise<User> {
        return firstValueFrom(this.usersService.updateUser(dto))
    }

    public async deleteUser(
        dto: DeleteUserRequest
    ): Promise<User> {
        return firstValueFrom(this.usersService.deleteUser(dto))
    }

}