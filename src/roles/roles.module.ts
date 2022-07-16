import { Global, Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { join } from 'path'
import 'dotenv/config'
import { RolesService } from './services/roles.service'
import { RolesController } from './roles.controller'
import {
    ROLES_PACKAGE_NAME,
} from './roles.pb'
import { PermissionsController } from './permissions.controller'
import { PermissionsService } from './services/permissions.service'
import { ProjectsModule } from 'src/projects/projects.module'
import { CacheModule } from 'src/cache/cache.module'

@Global()
@Module({
    imports: [
        ClientsModule.register([
            {
                name: ROLES_PACKAGE_NAME,
                transport: Transport.GRPC,
                options: {
                    url: '127.0.0.1:50054',
                    package: ROLES_PACKAGE_NAME,
                    protoPath: join(
                        __dirname, '..', '..', 'node_modules', 'syntx-protos', 'roles', 'roles.proto'
                    ),
                }
            },
        ]),
        ProjectsModule,
        CacheModule,
    ],
    providers: [
        RolesService,
        PermissionsService,
    ],
    controllers: [
        RolesController,
        PermissionsController,
    ],
    exports: [
        RolesService,
        PermissionsService,
    ]
})
export class RolesModule {}
