import { Body, Controller, Delete, Get, Param, Put, Query, UseGuards } from '@nestjs/common'
import {
    Permission, Void
} from './roles.pb'
import { Observable } from 'rxjs'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { PermissionsService } from './services/permissions.service'

@Controller()
export class PermissionsController {

    constructor(
        private permissionsService: PermissionsService
    ) {}

    @Get('/permissions/:permissionId')
    public async getPermissionById(
        @Param('permissionId') permissionId: string,
    ): Promise<Permission> {
        return this.permissionsService.getPermissionById({ permissionId: +permissionId })
    }

    @Get('/roles/:roleId/permissions')
    @UseGuards(JwtAuthGuard)
    public async getPermissionsByRoleId(
        @Query('roleId') roleId: string,
    ): Promise<Observable<Permission>> {
        return this.permissionsService.getPermissionsByRoleId({ roleId })
    }

    @Get('/users/:userId/permissions?projectId=:projectId')
    @UseGuards(JwtAuthGuard)
    public async getPermissionsByUserId(
        @Param('userId') userId: string,
        @Query('groupId') projectId: string,
    ): Promise<Observable<Permission>> {
        return this.permissionsService.getPermissionsByUserIdAndProjectId({ userId, projectId })
    }

    @Put('/roles/:roleId/permissions')
    @UseGuards(JwtAuthGuard)
    public async addPermissionToRole(
        @Query('roleId') roleId: string,
        @Body() { permissionId }: { permissionId: number },
    ): Promise<Void> {
        return this.permissionsService.addPermissionToRole({ permissionId, roleId })
    }

    @Put('/users/:userId/permissions')
    @UseGuards(JwtAuthGuard)
    public async addPermissionToUserInProject(
        @Query('userId') userId: string,
        @Body() { permissionId, projectId }: { permissionId: number, projectId: string },
    ): Promise<Void> {
        return this.permissionsService.addPermissionToUserInProject({ permissionId, projectId, userId })
    }

    @Delete('/roles/:roleId/permissions')
    @UseGuards(JwtAuthGuard)
    public async removePermissionFromRole(
        @Query('roleId') roleId: string,
        @Body() { permissionId }: { permissionId: number },
    ): Promise<Void> {
        return this.permissionsService.removePermissionFromRole({ permissionId, roleId })
    }

    @Delete('/users/:userId/permissions')
    @UseGuards(JwtAuthGuard)
    public async removePermissionFromUserInProject(
        @Query('userId') userId: string,
        @Body() { permissionId, projectId }: { permissionId: number, projectId: string },
    ): Promise<Void> {
        return this.permissionsService.removePermissionFromUserInProject({ permissionId, userId, projectId })
    }

}