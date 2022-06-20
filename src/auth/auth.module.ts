import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { join } from 'path'
import { AuthController } from './auth.controller'
import { AUTH_PACKAGE_NAME, AUTH_SERVICE_NAME } from './auth.pb'
import 'dotenv/config'

@Module({
    imports: [
        ClientsModule.register([
            {
                name: AUTH_SERVICE_NAME,
                transport: Transport.GRPC,
                options: {
                    url: process.env.AUTH_SERVICE_URL,
                    package: AUTH_PACKAGE_NAME,
                    protoPath: join(
                        __dirname, '..', '..', 'node_modules', 'syntx-protos', 'auth', 'auth.proto'
                    ),
                }
            }
        ])
    ],
    controllers: [ AuthController ],
})
export class AuthModule {}
