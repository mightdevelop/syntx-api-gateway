import { Inject, Injectable } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'
import { firstValueFrom, Observable } from 'rxjs'
import {
    DeleteUserRequest,
    UpdateUserRequest,
    User,
    UserByIdRequest,
    UsersServiceClient,
    USERS_SERVICE_NAME
} from '../users.pb'

@Injectable()
export class UsersService {

    private usersService: UsersServiceClient

    @Inject(USERS_SERVICE_NAME)
    private readonly client: ClientGrpc

    onModuleInit(): void {
        this.usersService = this.client.getService<UsersServiceClient>(USERS_SERVICE_NAME)
    }

    public async getUserById(
        dto: UserByIdRequest
    ): Promise<User> {
        return firstValueFrom(this.usersService.getUserById(dto))
    }

    public async getUsers(): Promise<Observable<User>> {
        return this.usersService.getUsers({})
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