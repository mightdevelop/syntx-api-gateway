import { Body, Controller, Delete, Get, Inject, Param, Put } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'
import { firstValueFrom, Observable } from 'rxjs'
import { UpdateUserDto } from './dto/update-user-dto'
import {
    User,
    UsersServiceClient,
    USERS_SERVICE_NAME
} from './users.pb'

@Controller('users')
export class UsersController {

    private usersService: UsersServiceClient

    @Inject(USERS_SERVICE_NAME)
    private readonly client: ClientGrpc

    onModuleInit(): void {
        this.usersService = this.client.getService<UsersServiceClient>(USERS_SERVICE_NAME)
    }

    @Get('/:userId')
    public async getUserById(
        @Param('userId') userId: string,
    ): Promise<User> {
        return firstValueFrom(this.usersService.getUserById({ userId }))
    }

    @Get('/')
    public async getUsers(): Promise<Observable<User>> {
        return this.usersService.getUsers({})
    }

    @Put('/:userId')
    public async updateUser(
        @Param('userId') userId: string,
        @Body() dto: UpdateUserDto,
    ): Promise<User> {
        return firstValueFrom(this.usersService.updateUser({ ...dto, userId }))
    }

    @Delete('/:userId')
    public async deleteUser(
        @Param('userId') userId: string,
    ): Promise<User> {
        return firstValueFrom(this.usersService.deleteUser({ userId }))
    }

}