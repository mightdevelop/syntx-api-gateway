import { Inject, Injectable } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'
import { firstValueFrom, Observable } from 'rxjs'
import {
    InvitesServiceClient,
    Invite,
    PROJECTS_PACKAGE_NAME,
    INVITES_SERVICE_NAME,
    ProjectIdAndUserId,
    InviteId,
    SearchInvitesParams,
} from '../projects.pb'

@Injectable()
export class InvitesService {

    private invitesService: InvitesServiceClient

    @Inject(PROJECTS_PACKAGE_NAME)
    private readonly client: ClientGrpc

    onModuleInit(): void {
        this.invitesService = this.client.getService<InvitesServiceClient>(INVITES_SERVICE_NAME)
    }

    public async getInviteById(
        dto: InviteId
    ): Promise<Invite> {
        return firstValueFrom(this.invitesService.getInviteById(dto))
    }

    public async searchInvites(
        dto: SearchInvitesParams
    ): Promise<Observable<Invite>> {
        return this.invitesService.searchInvites(dto)
    }

    public async createInvite(
        dto: ProjectIdAndUserId
    ): Promise<Invite> {
        return firstValueFrom(this.invitesService.createInvite(dto))
    }

    public async deleteInviteById(
        dto: InviteId
    ): Promise<Invite> {
        return firstValueFrom(this.invitesService.deleteInviteById(dto))
    }

    public async deleteInviteByUserIdAndProjectId(
        dto: ProjectIdAndUserId
    ): Promise<Invite> {
        return firstValueFrom(this.invitesService.deleteInviteByUserIdAndProjectId(dto))
    }

}