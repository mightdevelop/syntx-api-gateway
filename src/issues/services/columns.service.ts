import { Inject, Injectable } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'
import { firstValueFrom, Observable } from 'rxjs'
import {
    ISSUES_PACKAGE_NAME,
    COLUMNS_SERVICE_NAME,
    ColumnsServiceClient,
    Column,
    BoardIdAndColumnName,
    ColumnIdAndName,
    SearchColumnsParams,
} from '../issues.pb'

@Injectable()
export class ColumnsService {

    private columnsService: ColumnsServiceClient

    @Inject(ISSUES_PACKAGE_NAME)
    private readonly client: ClientGrpc

    onModuleInit(): void {
        this.columnsService = this.client.getService<ColumnsServiceClient>(COLUMNS_SERVICE_NAME)
    }

    public async getColumnById(columnId: string): Promise<Column> {
        return firstValueFrom(this.columnsService.getColumnById({ columnId }))
    }

    public searchColumns(dto: SearchColumnsParams): Observable<Column> {
        return this.columnsService.searchColumns(dto)
    }

    public async createColumn(dto: BoardIdAndColumnName): Promise<Column> {
        return firstValueFrom(this.columnsService.createColumn(dto))
    }

    public async updateColumn(dto: ColumnIdAndName): Promise<Column> {
        return firstValueFrom(this.columnsService.updateColumn(dto))
    }

    public async deleteColumn(columnId: string): Promise<Column> {
        return firstValueFrom(this.columnsService.deleteColumn({ columnId }))
    }

}