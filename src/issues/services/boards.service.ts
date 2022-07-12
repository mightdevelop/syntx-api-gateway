import { Inject, Injectable } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'
import {
    ISSUES_PACKAGE_NAME,
    BOARDS_SERVICE_NAME,
    BoardsServiceClient,
    Board,
} from '../issues.pb'

@Injectable()
export class BoardsService {

    private boardsService: BoardsServiceClient

    @Inject(ISSUES_PACKAGE_NAME)
    private readonly client: ClientGrpc

    onModuleInit(): void {
        this.boardsService = this.client.getService<BoardsServiceClient>(BOARDS_SERVICE_NAME)
    }

    public async getBoardById(boardId: string): Promise<Board> {
        return firstValueFrom(this.boardsService.getBoardById({ boardId }))
    }

    public async getBoardByProjectId(projectId: string): Promise<Board> {
        return firstValueFrom(this.boardsService.getBoardByProjectId({ projectId }))
    }

    public async createBoard(projectId: string): Promise<Board> {
        return firstValueFrom(this.boardsService.createBoard({ projectId }))
    }

    public async deleteBoard(boardId: string): Promise<Board> {
        return firstValueFrom(this.boardsService.deleteBoard({ boardId }))
    }

}