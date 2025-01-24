import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule, // Serviço para buscar usuários
    JwtModule.register({
      secret: '1234', // Substitua por uma chave secreta segura
      signOptions: { expiresIn: '1h' }, // Tempo de expiração do token
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
