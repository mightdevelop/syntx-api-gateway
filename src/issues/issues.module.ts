import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { join } from 'path'
import 'dotenv/config'
import { IssuesService } from './services/issues.service'
import { IssuesController } from './controllers/issues.controller'
import { ISSUES_PACKAGE_NAME } from './issues.pb'
import { ColumnsService } from './services/columns.service'
import { BoardsService } from './services/boards.service'
import { DependenciesService } from './services/dependencies.service'
import { DependenciesController } from './controllers/dependencies.controller'
import { BoardsController } from './controllers/boards.controller'
import { ColumnsController } from './controllers/columns.controller'

@Module({
    imports: [
        ClientsModule.register([
            {
                name: ISSUES_PACKAGE_NAME,
                transport: Transport.GRPC,
                options: {
                    url: '127.0.0.1:50053',
                    package: ISSUES_PACKAGE_NAME,
                    protoPath: join(
                        __dirname, '..', '..', 'node_modules', 'syntx-protos', 'issues', 'issues.proto'
                    ),
                }
            },
        ])
    ],
    providers: [
        IssuesService,
        ColumnsService,
        BoardsService,
        DependenciesService,
    ],
    controllers: [
        IssuesController,
        ColumnsController,
        BoardsController,
        DependenciesController,
    ],
})
export class IssuesModule {}
