import { Inject, Injectable } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'
import { firstValueFrom, Observable } from 'rxjs'
import {
    InvitesServiceClient,
    InviteByIdRequest,
    Invite,
    InvitesByProjectIdRequest,
    InvitesByUserIdRequest,
    CreateInviteRequest,
    DeleteInviteByIdRequest,
    DeleteInviteByUserIdAndProjectIdRequest,
    INVITES_SERVICE_NAME,
} from '../projects.pb'

@Injectable()
export class InvitesService {

    private invitesService: InvitesServiceClient

    @Inject(INVITES_SERVICE_NAME)
    private readonly client: ClientGrpc

    onModuleInit(): void {
        this.invitesService = this.client.getService<InvitesServiceClient>(INVITES_SERVICE_NAME)
    }

    public async getInviteById(
        dto: InviteByIdRequest
    ): Promise<Invite> {
        return firstValueFrom(this.invitesService.getInviteById(dto))
    }

    public async getInvitesByProjectId(
        dto: InvitesByProjectIdRequest
    ): Promise<Observable<Invite>> {
        return this.invitesService.getInvitesByProjectId(dto)
    }

    public async getInvitesByUserId(
        dto: InvitesByUserIdRequest
    ): Promise<Observable<Invite>> {
        return this.invitesService.getInvitesByUserId(dto)
    }

    public async createInvite(
        dto: CreateInviteRequest
    ): Promise<Invite> {
        return firstValueFrom(this.invitesService.createInvite(dto))
    }

    public async deleteInviteById(
        dto: DeleteInviteByIdRequest
    ): Promise<Invite> {
        return firstValueFrom(this.invitesService.deleteInviteById(dto))
    }

    public async deleteInviteByUserIdAndProjectId(
        dto: DeleteInviteByUserIdAndProjectIdRequest
    ): Promise<Invite> {
        return firstValueFrom(this.invitesService.deleteInviteByUserIdAndProjectId(dto))
    }

}