import { Injectable } from '@nestjs/common';
import { IAppService } from '../ports/inbound/app.service.interface';

@Injectable()
export class AppService implements IAppService {
  getHello(): string {
    return 'Hello World!';
  }
}
