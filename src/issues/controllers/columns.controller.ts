import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common'
import { ColumnsService } from '../services/columns.service'
import { BoardIdAndColumnName, Column, ColumnIdAndName } from '../issues.pb'
import { Observable } from 'rxjs'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'

@Controller('/columns')
export class ColumnsController {

    constructor(
        private columnsService: ColumnsService
    ) {}

    @Get('/:columnId')
    public async getColumnById(
        @Param('columnId') columnId: string,
    ): Promise<Column> {
        return this.columnsService.getColumnById(columnId)
    }

    @Get('/search?')
    @UseGuards(JwtAuthGuard)
    public async getColumnsByBoardId(
        @Query('boardId') boardId: string,
        @Query('limit') limit: string,
    ): Promise<Observable<Column>> {
        return this.columnsService.searchColumns({
            boardId,
            columnsIds: [],
            limit: +limit
        })
    }

    @Post('/')
    @UseGuards(JwtAuthGuard)
    public async createColumn(
        @Body() dto: BoardIdAndColumnName,
    ): Promise<Column> {
        return this.columnsService.createColumn(dto)
    }

    @Put('/:columnId')
    @UseGuards(JwtAuthGuard)
    public async updateColumn(
        @Param('columnId') columnId: string,
        @Body() dto: ColumnIdAndName,
    ): Promise<Column> {
        return this.columnsService.updateColumn({ ...dto, columnId })
    }

    @Delete('/:columnId')
    @UseGuards(JwtAuthGuard)
    public async deleteColumn(
        @Param('columnId') columnId: string,
    ): Promise<Column> {
        return this.columnsService.deleteColumn(columnId)
    }

}