import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common'
import { UpdateProjectDto } from './dto/update-project-dto'
import { CreateInviteRequest, Invite } from './projects.pb'
import { Observable } from 'rxjs'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { InvitesService } from './services/invites.service'

@Controller()
export class InvitesController {

    constructor(
        private invitesService: InvitesService
    ) {}

    @Get('/invites/:inviteId')
    public async getInviteById(
        @Param('inviteId') inviteId: string,
    ): Promise<Invite> {
        return this.invitesService.getInviteById({ inviteId })
    }

    @Get('/projects/:projectId/invites')
    @UseGuards(JwtAuthGuard)
    public async getInvitesByProjectId(
        @Query('projectId') projectId: string,
    ): Promise<Observable<Invite>> {
        return this.invitesService.getInvitesByProjectId({ projectId })
    }

    @Get('/users/:userId/projects')
    @UseGuards(JwtAuthGuard)
    public async getInvitesByUserId(
        @Param('userId') userId: string,
    ): Promise<Observable<Invite>> {
        return this.invitesService.getInvitesByUserId({ userId })
    }

    @Post('/invites')
    @UseGuards(JwtAuthGuard)
    public async createInvite(
        @Body() dto: CreateInviteRequest,
    ): Promise<Invite> {
        return this.invitesService.createInvite(dto)
    }

    @Put('/invites/:invitesId')
    @UseGuards(JwtAuthGuard)
    public async deleteInviteById(
        @Param('inviteId') inviteId: string,
        @Body() dto: UpdateProjectDto,
    ): Promise<Invite> {
        return this.invitesService.deleteInviteById({ ...dto, inviteId })
    }

    @Delete('/invites/search?projectId=:projectId&userId=:userId')
    @UseGuards(JwtAuthGuard)
    public async deleteInviteByUserIdAndProjectId(
        @Query('projectId') projectId: string,
        @Query('userId') userId: string,
    ): Promise<Invite> {
        return this.invitesService.deleteInviteByUserIdAndProjectId({ projectId, userId })
    }
}