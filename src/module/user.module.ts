import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../infrastructure/web/user/user.controller';
import { UserRepository } from '../infrastructure/persistence/typeorm/repository/user/user.repository';
import { IUserRepository } from '../domain/repository/user.interface';
import { Users, UserSetting } from '../infrastructure/persistence/typeorm/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Users, UserSetting])],
  controllers: [UserController],
  providers: [{ provide: IUserRepository, useClass: UserRepository }],
  exports: [IUserRepository],
})
export class UserModule {}
