import { Inject, Injectable } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'
import { firstValueFrom, Observable } from 'rxjs'
import { PermissionsCacheService } from 'src/cache/services/permissions-cache.service'
import {
    Permission,
    PermissionId,
    PermissionIdAndRoleId,
    PermissionIdAndUserIdAndProjectId,
    PermissionsServiceClient,
    PERMISSIONS_SERVICE_NAME,
    ROLES_PACKAGE_NAME,
    RoleId,
    UserIdAndProjectId,
    Void,
    PermissionsIdsAndRoleId,
    PermissionsIdsAndUserIdAndProjectId
} from '../roles.pb'

@Injectable()
export class PermissionsService {

    private permissionsService: PermissionsServiceClient

    constructor(
        private permissionsCacheService: PermissionsCacheService
    ) {}

    @Inject(ROLES_PACKAGE_NAME)
    private readonly client: ClientGrpc

    onModuleInit(): void {
        this.permissionsService = this.client
            .getService<PermissionsServiceClient>(PERMISSIONS_SERVICE_NAME)
    }

    public async getPermissionById(
        dto: PermissionId
    ): Promise<Permission> {
        return firstValueFrom(this.permissionsService.getPermissionById(dto))
    }

    public async getPermissionsByRoleId(
        dto: RoleId
    ): Promise<Observable<Permission>> {
        return this.permissionsService.getPermissionsByRoleId(dto)
    }

    public async getPermissionsByUserIdAndProjectId(
        dto: UserIdAndProjectId
    ): Promise<Observable<Permission>> {
        return this.permissionsService.getPermissionsByUserIdAndProjectId(dto)
    }

    public async doesUserHavePermission(
        dto: PermissionIdAndUserIdAndProjectId
    ): Promise<boolean> {
        let bool = await this.permissionsCacheService.doesUserHavePermission(dto)
        if (bool) {
            return bool
        }
        bool = (await firstValueFrom(this.permissionsService.doesUserHavePermission(dto))).bool
        return bool
    }

    public async doesRoleHavePermission(
        dto: PermissionIdAndRoleId
    ): Promise<boolean> {
        return (await firstValueFrom(this.permissionsService.doesRoleHavePermission(dto))).bool
    }

    public async addPermissionsToRole(
        dto: PermissionsIdsAndRoleId
    ): Promise<Void> {
        return firstValueFrom(this.permissionsService.addPermissionsToRole(dto))
    }

    public async addPermissionsToUserInProject(
        dto: PermissionsIdsAndUserIdAndProjectId
    ): Promise<Void> {
        return firstValueFrom(this.permissionsService.addPermissionsToUserInProject(dto))
    }


    public async removePermissionsFromRole(
        dto: PermissionsIdsAndRoleId
    ): Promise<Void> {
        return firstValueFrom(this.permissionsService.removePermissionsFromRole(dto))
    }

    public async removePermissionsFromUserInProject(
        dto: PermissionsIdsAndUserIdAndProjectId
    ): Promise<Void> {
        return firstValueFrom(this.permissionsService.removePermissionsFromUserInProject(dto))
    }

}