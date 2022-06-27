import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { join } from 'path'
import 'dotenv/config'
import { RolesService } from './services/roles.service'
import { RolesController } from './roles.controller'
import {
    ROLES_SERVICE_NAME,
    ROLES_PACKAGE_NAME,
    PERMISSIONS_SERVICE_NAME,
} from './roles.pb'
import { PermissionsController } from './permissions.controller'
import { PermissionsService } from './services/permissions.service'

@Module({
    imports: [
        ClientsModule.register([
            {
                name: ROLES_SERVICE_NAME,
                transport: Transport.GRPC,
                options: {
                    url: '127.0.0.1:50055',
                    package: ROLES_PACKAGE_NAME,
                    protoPath: join(
                        __dirname, '..', '..', 'node_modules', 'syntx-protos', 'projects', 'roles.proto'
                    ),
                }
            },
            {
                name: PERMISSIONS_SERVICE_NAME,
                transport: Transport.GRPC,
                options: {
                    url: '127.0.0.1:50055',
                    package: ROLES_PACKAGE_NAME,
                    protoPath: join(
                        __dirname, '..', '..', 'node_modules', 'syntx-protos', 'projects', 'roles.proto'
                    ),
                }
            },
        ])
    ],
    providers: [
        RolesService,
        PermissionsService,
    ],
    controllers: [
        RolesController,
        PermissionsController,
    ],
    exports: [ RolesService ]
})
export class ProjectsModule {}
