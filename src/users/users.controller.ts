import { Body, Controller, Delete, Get, Param, Put, UseGuards } from '@nestjs/common'
import { Observable } from 'rxjs'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { UpdateUserDto } from './dto/update-user-dto'
import { UsersService } from './services/users.service'
import { User } from './users.pb'

@Controller('users')
export class UsersController {

    constructor(
        private usersService: UsersService
    ) {}

    @Get('/:userId')
    public async getUserById(
        @Param('userId') userId: string,
    ): Promise<User> {
        return this.usersService.getUserById({ userId })
    }

    @Get('/')
    @UseGuards(JwtAuthGuard)
    public async getUsers(): Promise<Observable<User>> {
        return this.usersService.getUsers()
    }

    @Put('/:userId')
    public async updateUser(
        @Param('userId') userId: string,
        @Body() dto: UpdateUserDto,
    ): Promise<User> {
        return this.usersService.updateUser({ ...dto, userId })
    }

    @Delete('/:userId')
    public async deleteUser(
        @Param('userId') userId: string,
    ): Promise<User> {
        return this.usersService.deleteUser({ userId })
    }

}