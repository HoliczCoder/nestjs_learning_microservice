import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user.controller';
import { ProductController } from './product.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, UserController, ProductController],
  providers: [
    AppService,
    {
      provide: 'USER_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            port: Number(process.env.USER_SERVICE_PORT),
            host: process.env.USER_SERVICE_HOST,
          },
        });
      },
    },
    {
      provide: 'PRODUCT_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            port: Number(process.env.PRODUCT_SERVICE_PORT),
            host: process.env.PRODUCT_SERVICE_HOST,
          },
        });
      },
    },
  ],
})
export class GatewayModule {}
