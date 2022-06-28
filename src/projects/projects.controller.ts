import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common'
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'
import { UserFromRequest } from 'src/auth/types/user-from-request'
import { UpdateProjectDto } from './dto/update-project-dto'
import { ProjectsService } from './services/projects.service'
import { Project } from './projects.pb'
import { Observable } from 'rxjs'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'

@Controller()
export class ProjectsController {

    constructor(
        private projectsService: ProjectsService
    ) {}

    @Get('/projects/:projectId')
    public async getProjectById(
        @Param('projectId') projectId: string,
    ): Promise<Project> {
        return this.projectsService.getProjectById({ projectId })
    }

    @Get('/users/:userId/projects')
    @UseGuards(JwtAuthGuard)
    public async getProjectsByUserId(
        @CurrentUser() user: UserFromRequest,
        @Param('userId') userId: string,
        @Query('mutual') mutual: string
    ): Promise<Observable<Project>> {
        if (mutual) {
            return this.projectsService.getMutualProjectsByUsersIds([ user.id, userId ])
        }
        return this.projectsService.getProjectsByUserId(userId)
    }

    @Get('/projects/byLead')
    @UseGuards(JwtAuthGuard)
    public async getProjectsByLeadId(
        @Query('leadId') leadId: string,
    ): Promise<Observable<Project>> {
        return this.projectsService.getProjectsByLeadId(leadId)
    }
    @Post('/projects')
    @UseGuards(JwtAuthGuard)
    public async createProject(
        @CurrentUser() user: UserFromRequest,
        @Body() { name }: { name: string },
    ): Promise<Project> {
        return this.projectsService.createProject({ name, leadId: user.id })
    }

    @Put('/projects/:projectId')
    @UseGuards(JwtAuthGuard)
    public async updateProject(
        @Param('projectId') projectId: string,
        @Body() dto: UpdateProjectDto,
    ): Promise<Project> {
        return this.projectsService.updateProject({ ...dto, projectId })
    }

    @Delete('/projects/:projectId')
    @UseGuards(JwtAuthGuard)
    public async deleteProject(
        @Param('projectId') projectId: string,
    ): Promise<Project> {
        return this.projectsService.deleteProject({ projectId })
    }

    @Delete('/projects/:projectId/users/:userId')
    @UseGuards(JwtAuthGuard)
    public async removeUserFromProject(
        @Param('projectId') projectId: string,
        @Param('userId') userId: string,
    ): Promise<void> {
        this.projectsService.removeUserFromProject({ projectId, userId })
    }

}