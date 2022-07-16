import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common'
import { RolesService } from './services/roles.service'
import { CreateRoleRequest, Role, UserId } from './roles.pb'
import { Observable } from 'rxjs'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { ProjectsService } from 'src/projects/services/projects.service'

@Controller()
export class RolesController {

    constructor(
        private rolesService: RolesService,
        private projectsService: ProjectsService,
    ) {}

    @Get('/roles/:roleId')
    public async getRoleById(
        @Param('roleId') roleId: string,
    ): Promise<Role> {
        return this.rolesService.getRoleById({ roleId })
    }

    @Get('/projects/:projectId/roles')
    @UseGuards(JwtAuthGuard)
    public async getRolesByProjectId(
        @Param('projectId') projectId: string,
    ): Promise<Observable<Role>> {
        return this.rolesService.getRolesByProjectId({ projectId })
    }

    @Get('/roles/search?projectId=:projectId&userId=:userId')
    @UseGuards(JwtAuthGuard)
    public async getRolesByUserIdAndProjectId(
        @Query('projectId') projectId: string,
        @Query('userId') userId: string,
    ): Promise<Observable<Role>> {
        return this.rolesService.getRolesByUserIdAndProjectId({ projectId, userId })
    }

    @Get('/roles/:roleId/users')
    @UseGuards(JwtAuthGuard)
    public async getUsersIdsByRoleId(
        @Param('roleId') roleId: string,
    ): Promise<Observable<UserId>> {
        return this.rolesService.getUsersIdsByRoleId({ roleId })
    }

    @Get('/roles/search?roleName=:roleName')
    @UseGuards(JwtAuthGuard)
    public async getRoleByName(
        @Query('roleName') roleName: string,
    ): Promise<Role> {
        return this.rolesService.getRoleByName({ roleName })
    }

    @Post('/roles')
    @UseGuards(JwtAuthGuard)
    public async createRole(
        @Body() dto: CreateRoleRequest,
    ): Promise<Role> {
        const project = await this.projectsService.getProjectById({ projectId: dto.projectId })
        if (!project) {
            throw new BadRequestException({ message: 'Project not found' })
        }
        return this.rolesService.createRole(dto)
    }

    @Put('/roles/:roleId')
    @UseGuards(JwtAuthGuard)
    public async updateRole(
        @Param('roleId') roleId: string,
        @Body() { name }: { name: string },
    ): Promise<Role> {
        return this.rolesService.updateRole({ roleId, name })
    }

    @Delete('/roles/:roleId')
    @UseGuards(JwtAuthGuard)
    public async deleteRole(
        @Param('roleId') roleId: string,
    ): Promise<Role> {
        return this.rolesService.deleteRole({ roleId })
    }

    @Put('/roles/:roleId/users/:userId')
    @UseGuards(JwtAuthGuard)
    public async addRoleToUser(
        @Param('roleId') roleId: string,
        @Param('userId') userId: string,
    ): Promise<void> {
        this.rolesService.addRoleToUser({ roleId, userId })
    }

    @Delete('/roles/:roleId/users/:userId')
    @UseGuards(JwtAuthGuard)
    public async removeRoleFromUser(
        @Param('roleId') roleId: string,
        @Param('userId') userId: string,
    ): Promise<void> {
        this.rolesService.removeRoleFromUser({ roleId, userId })
    }

}