import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';

async function bootstrap() {
  // microservice #1
  const app = await NestFactory.create(GatewayModule);
  await app.listen(process.env.API_GATEWAY_PORT).then(() => {
    console.log('listen in', process.env.API_GATEWAY_PORT);
  });
}
bootstrap();
