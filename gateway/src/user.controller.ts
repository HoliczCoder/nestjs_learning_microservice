import { Controller, Get, Inject, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller('user')
export class UserController {
  constructor(
    private readonly appService: AppService,
    @Inject('USER_SERVICE')
    private readonly userServiceClient: ClientProxy,
  ) {}

  @Get('/:id')
  async getUserById(@Param('id') id: string) {
    return this.userServiceClient.send('user_get_by_id', id);
  }
}
