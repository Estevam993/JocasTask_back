import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataBaseConfig } from './database/database.config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from "./user/user.module";
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [UserModule, SequelizeModule.forRoot(dataBaseConfig), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}