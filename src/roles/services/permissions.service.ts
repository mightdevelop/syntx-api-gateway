import { Inject, Injectable } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'
import { firstValueFrom, Observable } from 'rxjs'
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
    Void
} from '../roles.pb'

@Injectable()
export class PermissionsService {

    private permissionsService: PermissionsServiceClient

    @Inject(ROLES_PACKAGE_NAME)
    private readonly client: ClientGrpc

    onModuleInit(): void {
        this.permissionsService = this.client.getService<PermissionsServiceClient>(PERMISSIONS_SERVICE_NAME)
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
        return (await firstValueFrom(this.permissionsService.doesUserHavePermission(dto))).bool
    }

    public async doesRoleHavePermission(
        dto: PermissionIdAndRoleId
    ): Promise<boolean> {
        return (await firstValueFrom(this.permissionsService.doesRoleHavePermission(dto))).bool
    }

    public async addPermissionToRole(
        dto: PermissionIdAndRoleId
    ): Promise<Void> {
        return firstValueFrom(this.permissionsService.addPermissionToRole(dto))
    }

    public async addPermissionToUserInProject(
        dto: PermissionIdAndUserIdAndProjectId
    ): Promise<Void> {
        return firstValueFrom(this.permissionsService.addPermissionToUserInProject(dto))
    }


    public async removePermissionFromRole(
        dto: PermissionIdAndRoleId
    ): Promise<Void> {
        return firstValueFrom(this.permissionsService.removePermissionFromRole(dto))
    }

    public async removePermissionFromUserInProject(
        dto: PermissionIdAndUserIdAndProjectId
    ): Promise<Void> {
        return firstValueFrom(this.permissionsService.removePermissionFromUserInProject(dto))
    }

}