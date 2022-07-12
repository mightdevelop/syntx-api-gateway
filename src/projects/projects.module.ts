import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { join } from 'path'
import 'dotenv/config'
import { ProjectsService } from './services/projects.service'
import { ProjectsController } from './projects.controller'
import { PROJECTS_PACKAGE_NAME } from './projects.pb'
import { InvitesController } from './invites.controller'
import { InvitesService } from './services/invites.service'

@Module({
    imports: [
        ClientsModule.register([
            {
                name: PROJECTS_PACKAGE_NAME,
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
