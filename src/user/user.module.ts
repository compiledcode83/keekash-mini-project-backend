import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserExistsByEmailValidator } from './validators/user-exists-by-email.validator';

@Module({
  providers: [UserService, UserRepository, UserExistsByEmailValidator],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
