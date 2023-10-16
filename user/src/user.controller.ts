import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Transport } from '@nestjs/microservices';

@Controller()
export class UserController {
  constructor(private readonly appService: UserService) {}

  @MessagePattern('user_get_by_id', Transport.TCP)
  async getUserById(id: string) {
    return {
      name: 'Minh',
      age: '26',
      email: 'minh@gmail.com',
    };
  }
}
