import { NestFactory } from '@nestjs/core'
import { ApiGatewayModule } from './api-gateway.module'
import 'dotenv/config'

async function bootstrap() {
    const app = await NestFactory.create(ApiGatewayModule)
    await app.listen(process.env.APP_PORT)
    console.log('API gateway started on port ' + process.env.APP_PORT)
}
bootstrap()