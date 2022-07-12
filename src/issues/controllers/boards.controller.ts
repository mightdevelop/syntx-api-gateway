import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common'
import { BoardsService } from '../services/boards.service'
import { Board } from '../issues.pb'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'

@Controller('/boards')
export class BoardsController {

    constructor(
        private boardsService: BoardsService
    ) {}

    @Get('/:boardId')
    public async getBoardById(
        @Param('boardId') boardId: string,
    ): Promise<Board> {
        return this.boardsService.getBoardById(boardId)
    }

    @Get('/search?projectId=:projectId')
    @UseGuards(JwtAuthGuard)
    public async getBoardByProjectId(
        @Query('projectId') projectId: string,
    ): Promise<Board> {
        return this.boardsService.getBoardByProjectId(projectId)
    }

    @Post('/')
    @UseGuards(JwtAuthGuard)
    public async createBoard(
        @Body('projectId') projectId: string,
    ): Promise<Board> {
        return this.boardsService.createBoard(projectId)
    }

    @Delete('/:boardId')
    @UseGuards(JwtAuthGuard)
    public async deleteBoard(
        @Param('boardId') boardId: string,
    ): Promise<Board> {
        return this.boardsService.deleteBoard(boardId)
    }

}