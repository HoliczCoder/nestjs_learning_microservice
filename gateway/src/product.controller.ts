import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('product')
export class ProductController {
  constructor(private readonly appService: AppService) {}
}
