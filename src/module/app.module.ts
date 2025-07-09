import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '../infrastructure/web/app/app.controller';
import { AppService } from '../application/use-cases/app.service';
import { IAppService } from '../application/ports/inbound/app.service.interface';
import * as Model from '../infrastructure/persistence/typeorm/entities';
import { UserModule } from './user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: '192.168.37.103',
      port: 3306,
      username: 'orange',
      password: 'orangeJuice',
      database: 'orangebot',
      autoLoadEntities: true,
      synchronize: true,
      logging: false,
      dropSchema: false,
      entities: Object.values(Model),
    }),
    TypeOrmModule.forFeature([Model.Users]),
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: IAppService,
      useClass: AppService,
    },
  ],
})
export class AppModule {}
