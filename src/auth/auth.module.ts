import { PasswordBcryptEncrypt } from './password.bcrypt.encrypt';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [],
  providers: [PasswordBcryptEncrypt],
  exports: [PasswordBcryptEncrypt],
})
export class AuthModule {}
