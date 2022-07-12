import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { join } from 'path'
import { AuthController } from './auth.controller'
import { AUTH_PACKAGE_NAME } from './auth.pb'
import 'dotenv/config'
import { AuthService } from './services/auth.service'
import { JwtAuthStrategy } from './strategies/jwt-auth.strategy'
import { UsersModule } from 'src/users/users.module'
import 'dotenv/config'

@Module({
    imports: [
        ClientsModule.register([
            {
                name: AUTH_PACKAGE_NAME,
                transport: Transport.GRPC,
                options: {
                    url: '127.0.0.1:50052',
                    package: AUTH_PACKAGE_NAME,
                    protoPath: join(
                        __dirname, '..', '..', 'node_modules', 'syntx-protos', 'auth', 'auth.proto'
                    ),
                }
            }
        ]),
        UsersModule,
    ],
    providers: [
        AuthService,
        JwtAuthStrategy,
    ],
    controllers: [ AuthController ],
})
export class AuthModule {}
