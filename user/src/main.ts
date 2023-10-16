import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // microservice #1
  const app = await NestFactory.create(UserModule);
  const gatewayService = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: Number(process.env.USER_SERVICE_PORT),
      host: process.env.USER_SERVICE_HOST,
    },
  });
  // microservice #2
  const productService = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'cats_queue',
      queueOptions: {
        durable: false,
      },
    },
  });
  await app.startAllMicroservices();
  // await app.listen(3000);
  await app.init().then(() => {
    console.log('open TCP port', process.env.USER_SERVICE_PORT);
  });
}
bootstrap();
