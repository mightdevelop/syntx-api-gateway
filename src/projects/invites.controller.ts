import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common'
import { UpdateProjectDto } from './dto/update-project-dto'
import { Invite } from './projects.pb'
import { Observable } from 'rxjs'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { InvitesService } from './services/invites.service'
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'
import { UserFromRequest } from 'src/auth/types/user-from-request'
import { PermissionsGuard } from 'src/roles/guards/permissions.guard'
import { RequiredPermission } from 'src/roles/decorators/required-permission.decorator'
import { UsersService } from 'src/users/services/users.service'

@Controller()
export class InvitesController {

    constructor(
        private invitesService: InvitesService,
        private usersService: UsersService,
    ) {}

    @Get('/invites/:inviteId')
    @UseGuards(JwtAuthGuard)
    public async getInviteById(
        @Param('inviteId') inviteId: string,
    ): Promise<Invite> {
        return this.invitesService.getInviteById({ inviteId })
    }

    @Get('/projects/:projectId/invites?')
    @UseGuards(JwtAuthGuard)
    public async getInvitesByProjectId(
        @Param('projectId') projectId: string,
        @Query('limit') limit: string,
    ): Promise<Observable<Invite>> {
        return this.invitesService.searchInvites({
            projectId,
            invitesIds: [],
            limit: + limit,
        })
    }

    @Get('/invites?')
    @UseGuards(JwtAuthGuard)
    public async getMyInvites(
        @CurrentUser() user: UserFromRequest,
        @Query('limit') limit: string,
    ): Promise<Observable<Invite>> {
        return this.invitesService.searchInvites({
            userId: user.id,
            invitesIds: [],
            limit: + limit,
        })
    }

    @Post('/projects/:projectId/invites')
    @RequiredPermission(1)
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    public async createInvite(
        @Param('projectId') projectId: string,
        @Body() { userId }: { userId: string },
    ): Promise<Invite> {
        const user = await this.usersService.getUserById({ userId })
        if (!user) {
            throw new BadRequestException({ message: 'User not found' })
        }
        return this.invitesService.createInvite({ projectId, userId })
    }

    @Delete('/invites/:invitesId')
    @RequiredPermission(1)
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    public async deleteInviteById(
        @Param('inviteId') inviteId: string,
        @Body() dto: UpdateProjectDto,
    ): Promise<Invite> {
        return this.invitesService.deleteInviteById({ ...dto, inviteId })
    }

    @Delete('/projects/:projectId/invites/search?')
    @RequiredPermission(1)
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    public async deleteInviteByUserIdAndProjectId(
        @Param('projectId') projectId: string,
        @Query('userId') userId: string,
    ): Promise<Invite> {
        return this.invitesService.deleteInviteByUserIdAndProjectId({ projectId, userId })
    }
}