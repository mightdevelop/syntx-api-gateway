import { Inject, Injectable } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'
import { firstValueFrom, Observable } from 'rxjs'
import {
    CreateRoleRequest,
    ProjectId,
    Role,
    RoleByNameRequest,
    RoleId,
    RoleIdAndName,
    RoleIdAndUserId,
    RolesServiceClient,
    ROLES_SERVICE_NAME,
    ROLES_PACKAGE_NAME,
    UserId,
    UserIdAndProjectId,
} from '../roles.pb'

@Injectable()
export class RolesService {

    private rolesService: RolesServiceClient

    @Inject(ROLES_PACKAGE_NAME)
    private readonly client: ClientGrpc

    onModuleInit(): void {
        this.rolesService = this.client.getService<RolesServiceClient>(ROLES_SERVICE_NAME)
    }

    public async getRoleById(
        dto: RoleId
    ): Promise<Role> {
        return firstValueFrom(this.rolesService.getRoleById(dto))
    }

    public async getRolesByProjectId(
        dto: ProjectId
    ): Promise<Observable<Role>> {
        return this.rolesService.getRolesByProjectId(dto)
    }

    public async getRolesByUserIdAndProjectId(
        dto: UserIdAndProjectId
    ): Promise<Observable<Role>> {
        return this.rolesService.getRolesByUserIdAndProjectId(dto)
    }


    public async getUsersIdsByRoleId(
        dto: RoleId
    ): Promise<Observable<UserId>> {
        return this.rolesService.getUsersIdsByRoleId(dto)
    }

    public async getRoleByName(
        dto: RoleByNameRequest
    ): Promise<Role> {
        return firstValueFrom(this.rolesService.getRoleByName(dto))
    }

    public async createRole(
        dto: CreateRoleRequest
    ): Promise<Role> {
        return firstValueFrom(this.rolesService.createRole(dto))
    }

    public async updateRole(
        dto: RoleIdAndName
    ): Promise<Role> {
        return firstValueFrom(this.rolesService.updateRole(dto))
    }

    public async deleteRole(
        dto: RoleId
    ): Promise<Role> {
        return firstValueFrom(this.rolesService.deleteRole(dto))
    }

    public async addRoleToUser(
        dto: RoleIdAndUserId
    ): Promise<void> {
        this.rolesService.addRoleToUser(dto)
    }

    public async removeRoleFromUser(
        dto: RoleIdAndUserId
    ): Promise<void> {
        this.rolesService.removeRoleFromUser(dto)
    }

}