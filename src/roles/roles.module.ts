import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { join } from 'path'
import 'dotenv/config'
import { ProjectsService } from './services/roles.service'
import { ProjectsController } from './roles.controller'
import { INVITES_SERVICE_NAME, PROJECTS_PACKAGE_NAME, PROJECTS_SERVICE_NAME } from './projects.pb'
import { InvitesController } from './permissions.controller'
import { InvitesService } from './services/permissions.service'

@Module({
    imports: [
        ClientsModule.register([
            {
                name: PROJECTS_SERVICE_NAME,
                transport: Transport.GRPC,
                options: {
                    url: '127.0.0.1:50053',
                    package: PROJECTS_PACKAGE_NAME,
                    protoPath: join(
                        __dirname, '..', '..', 'node_modules', 'syntx-protos', 'projects', 'projects.proto'
                    ),
                }
            },
            {
                name: INVITES_SERVICE_NAME,
                transport: Transport.GRPC,
                options: {
                    url: '127.0.0.1:50053',
                    package: PROJECTS_PACKAGE_NAME,
                    protoPath: join(
                        __dirname, '..', '..', 'node_modules', 'syntx-protos', 'projects', 'projects.proto'
                    ),
                }
            },
        ])
    ],
    providers: [
        ProjectsService,
        InvitesService,
    ],
    controllers: [
        ProjectsController,
        InvitesController,
    ],
    exports: [ ProjectsService ]
})
export class ProjectsModule {}
