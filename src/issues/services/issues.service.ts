import { Inject, Injectable } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'
import { firstValueFrom, Observable } from 'rxjs'
import {
    ISSUES_PACKAGE_NAME,
    ISSUES_SERVICE_NAME,
    IssuesServiceClient,
    Issue,
    CreateIssueRequest,
    UpdateIssueRequest,
} from '../issues.pb'

@Injectable()
export class IssuesService {

    private issuesService: IssuesServiceClient

    @Inject(ISSUES_PACKAGE_NAME)
    private readonly client: ClientGrpc

    onModuleInit(): void {
        this.issuesService = this.client.getService<IssuesServiceClient>(ISSUES_SERVICE_NAME)
    }

    public async getIssueById(issueId: string): Promise<Issue> {
        return firstValueFrom(this.issuesService.getIssueById({ issueId }))
    }

    public async getIssuesByColumnId(columnId: string): Promise<Observable<Issue>> {
        return this.issuesService.getIssuesByColumnId({ columnId })
    }

    public async getIssuesByEpicId(epicId: string): Promise<Observable<Issue>> {
        return this.issuesService.getIssuesByEpicId({ epicId })
    }

    public async createIssue(dto: CreateIssueRequest): Promise<Issue> {
        return firstValueFrom(this.issuesService.createIssue(dto))
    }

    public async updateIssue(dto: UpdateIssueRequest): Promise<Issue> {
        return firstValueFrom(this.issuesService.updateIssue(dto))
    }

    public async deleteIssue(issueId: string): Promise<Issue> {
        return firstValueFrom(this.issuesService.deleteIssue({ issueId }))
    }

}