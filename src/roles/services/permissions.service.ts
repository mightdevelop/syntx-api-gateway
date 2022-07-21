import { Inject, Injectable } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'
import { firstValueFrom, Observable } from 'rxjs'
import { PermissionsCacheService } from 'src/cache/services/permissions-cache.service'
import {
    Permission,
    PermissionId,
    PermissionsServiceClient,
    PERMISSIONS_SERVICE_NAME,
    ROLES_PACKAGE_NAME,
    Void,
    PermissionsIdsAndRoleId,
    PermissionsIdsAndUserIdAndProjectId,
    SearchPermissionsParams
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

    public searchPermissions(
        dto: SearchPermissionsParams
    ): Observable<Permission> {
        return this.permissionsService.searchPermissions(dto)
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