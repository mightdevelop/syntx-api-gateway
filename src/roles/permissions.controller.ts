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

    @Get('/roles/:roleId/permissions?')
    @UseGuards(JwtAuthGuard)
    public async getPermissionsByRoleId(
        @Query('roleId') roleId: string,
        @Query('limit') limit: string,
    ): Promise<Observable<Permission>> {
        return this.permissionsService.searchPermissions({
            params: {
                $case: 'roleId',
                roleId,
            },
            permissionsIds: [],
            limit: +limit,
        })
    }

    @Get('/users/:userId/permissions?')
    @UseGuards(JwtAuthGuard)
    public async getPermissionsByUserIdAndProjectId(
        @Param('userId') userId: string,
        @Query('projectId') projectId: string,
        @Query('limit') limit: string,
    ): Promise<Observable<Permission>> {
        return this.permissionsService.searchPermissions({
            params: {
                $case: 'userIdAndProjectId',
                userIdAndProjectId: {
                    userId,
                    projectId,
                }
            },
            permissionsIds: [],
            limit: +limit,
        })
    }

    @Put('/roles/:roleId/permissions')
    @UseGuards(JwtAuthGuard)
    public async addPermissionsToRole(
        @Query('roleId') roleId: string,
        @Body() { permissionsIds }: { permissionsIds: number[] },
    ): Promise<Void> {
        return this.permissionsService.addPermissionsToRole({ permissionsIds, roleId })
    }

    @Put('/users/:userId/permissions')
    @UseGuards(JwtAuthGuard)
    public async addPermissionsToUserInProject(
        @Query('userId') userId: string,
        @Body() { permissionsIds, projectId }: { permissionsIds: number[], projectId: string },
    ): Promise<Void> {
        return this.permissionsService.addPermissionsToUserInProject({ permissionsIds, projectId, userId })
    }

    @Delete('/roles/:roleId/permissions')
    @UseGuards(JwtAuthGuard)
    public async removePermissionsFromRole(
        @Query('roleId') roleId: string,
        @Body() { permissionsIds }: { permissionsIds: number[] },
    ): Promise<Void> {
        return this.permissionsService.removePermissionsFromRole({ permissionsIds, roleId })
    }

    @Delete('/users/:userId/permissions')
    @UseGuards(JwtAuthGuard)
    public async removePermissionsFromUserInProject(
        @Query('userId') userId: string,
        @Body() { permissionsIds, projectId }: { permissionsIds: number[], projectId: string },
    ): Promise<Void> {
        return this.permissionsService.removePermissionsFromUserInProject(
            { permissionsIds, userId, projectId }
        )
    }

}