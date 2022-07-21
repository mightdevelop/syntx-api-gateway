import { Inject, Injectable } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'
import {
    PermissionsCacheServiceClient,
    PERMISSIONS_CACHE_SERVICE_NAME,
    CACHE_PACKAGE_NAME,
    DoesUserHavePermissionRequest,
    RemovePermissionsFromRoleRequest,
} from '../cache.pb'

@Injectable()
export class PermissionsCacheService {

    private cacheService: PermissionsCacheServiceClient

    @Inject(CACHE_PACKAGE_NAME)
    private readonly client: ClientGrpc

    onModuleInit(): void {
        this.cacheService = this.client.getService<PermissionsCacheServiceClient>(PERMISSIONS_CACHE_SERVICE_NAME)
    }

    public async doesUserHavePermission(
        dto: DoesUserHavePermissionRequest
    ): Promise<boolean> {
        return (await firstValueFrom(this.cacheService.doesUserHavePermission(dto))).bool
    }

    public async removePermissionsFromRole(
        dto: RemovePermissionsFromRoleRequest
    ): Promise<void> {
        this.cacheService.removePermissionsFromRole(dto)
    }

}