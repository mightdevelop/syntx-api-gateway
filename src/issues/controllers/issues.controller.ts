import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common'
import { IssuesService } from '../services/issues.service'
import { CreateIssueRequest, Issue } from '../issues.pb'
import { Observable } from 'rxjs'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { UpdateIssueDto } from '../dto/update-issue-dto'

@Controller('/issues')
export class IssuesController {

    constructor(
        private issuesService: IssuesService
    ) {}

    @Get('/:issueId')
    public async getIssueById(
        @Param('issueId') issueId: string,
    ): Promise<Issue> {
        return this.issuesService.getIssueById(issueId)
    }

    @Get('/search?columnId=:columnId')
    @UseGuards(JwtAuthGuard)
    public async getIssuesByColumnId(
        @Query('columnId') columnId: string,
    ): Promise<Observable<Issue>> {
        return this.issuesService.getIssuesByColumnId(columnId)
    }

    // @Get('/search?epicId=:epicId')
    // @UseGuards(JwtAuthGuard)
    // public async getIssuesByEpicId(
    //     @Query('epicId') epicId: string,
    // ): Promise<Observable<Issue>> {
    //     return this.issuesService.getIssuesByEpicId(epicId)
    // }

    @Post('/')
    @UseGuards(JwtAuthGuard)
    public async createIssue(
        @Body() dto: CreateIssueRequest,
    ): Promise<Issue> {
        return this.issuesService.createIssue(dto)
    }

    @Put('/:issueId')
    @UseGuards(JwtAuthGuard)
    public async updateIssue(
        @Param('issueId') issueId: string,
        @Body() dto: UpdateIssueDto,
    ): Promise<Issue> {
        return this.issuesService.updateIssue({ ...dto, issueId })
    }

    @Delete('/:issueId')
    @UseGuards(JwtAuthGuard)
    public async deleteIssue(
        @Param('issueId') issueId: string,
    ): Promise<Issue> {
        return this.issuesService.deleteIssue(issueId)
    }

}