import { Inject, Injectable } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'
import { firstValueFrom, Observable } from 'rxjs'
import { Permission, PermissionId, PermissionIdAndRoleId, PermissionIdAndUserId, PermissionsServiceClient, PERMISSIONS_SERVICE_NAME, RoleId, UserIdAndProjectId, Void } from '../roles.pb'

@Injectable()
export class PermissionsService {

    private permissionsService: PermissionsServiceClient

    @Inject(PERMISSIONS_SERVICE_NAME)
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

    public async addPermissionToRole(
        dto: PermissionIdAndRoleId
    ): Promise<Void> {
        return firstValueFrom(this.permissionsService.addPermissionToRole(dto))
    }

    public async addPermissionToUser(
        dto: PermissionIdAndUserId
    ): Promise<Void> {
        return firstValueFrom(this.permissionsService.addPermissionToUser(dto))
    }


    public async removePermissionFromRole(
        dto: PermissionIdAndRoleId
    ): Promise<Void> {
        return firstValueFrom(this.permissionsService.removePermissionFromRole(dto))
    }

    public async removePermissionFromUser(
        dto: PermissionIdAndUserId
    ): Promise<Void> {
        return firstValueFrom(this.permissionsService.removePermissionFromUser(dto))
    }

}