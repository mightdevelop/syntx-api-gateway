import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { join } from 'path'
import { UsersController } from './users.controller'
import { USERS_PACKAGE_NAME, USERS_SERVICE_NAME } from './users.pb'
import 'dotenv/config'
import { UsersService } from './services/users.service'

@Module({
    imports: [
        ClientsModule.register([
            {
                name: USERS_SERVICE_NAME,
                transport: Transport.GRPC,
                options: {
                    url: '127.0.0.1:50051',
                    package: USERS_PACKAGE_NAME,
                    protoPath: join(
                        __dirname, '..', '..', 'node_modules', 'syntx-protos', 'users', 'users.proto'
                    ),
                }
            }
        ])
    ],
    providers: [ UsersService ],
    controllers: [ UsersController ],
    exports: [ UsersService ]
})
export class UsersModule {}
