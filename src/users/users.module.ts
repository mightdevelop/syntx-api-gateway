import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { join } from 'path'
import { UsersController } from './users.controller'
import { USERS_PACKAGE_NAME, USERS_SERVICE_NAME } from './users.pb'
import 'dotenv/config'

@Module({
    imports: [
        ClientsModule.register([
            {
                name: USERS_SERVICE_NAME,
                transport: Transport.GRPC,
                options: {
                    url: process.env.USERS_SERVICE_URL,
                    package: USERS_PACKAGE_NAME,
                    protoPath: join(
                        __dirname, '..', '..', 'node_modules', 'syntx-protos', 'users', 'users.proto'
                    ),
                }
            }
        ])
    ],
    controllers: [ UsersController ],
})
export class UsersModule {}
