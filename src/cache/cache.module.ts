import { Global, Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { join } from 'path'
import 'dotenv/config'
import { ProjectsModule } from 'src/projects/projects.module'
import { CacheService } from './services/cache.service'
import { PermissionsCacheService } from './services/permissions-cache.service'
import { CACHE_PACKAGE_NAME } from './cache.pb'

@Global()
@Module({
    imports: [
        ClientsModule.register([
            {
                name: CACHE_PACKAGE_NAME,
                transport: Transport.GRPC,
                options: {
                    url: '127.0.0.1:50056',
                    package: CACHE_PACKAGE_NAME,
                    protoPath: join(
                        __dirname, '..', '..', 'node_modules', 'syntx-protos', 'cache', 'cache.proto'
                    ),
                }
            },
        ]),
        ProjectsModule,
    ],
    providers: [
        CacheService,
        PermissionsCacheService,
    ],
    exports: [
        CacheService,
        PermissionsCacheService,
    ]
})
export class CacheModule {}
