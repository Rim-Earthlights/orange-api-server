import { Controller, Get, Inject } from '@nestjs/common';
import { IAppService } from '../../../application/ports/inbound/app.service.interface';

@Controller()
export class AppController {
  constructor(@Inject(IAppService) private readonly appService: IAppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
