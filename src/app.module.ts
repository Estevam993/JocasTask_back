import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataBaseConfig } from './database/database.config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from "./user/user.module";


@Module({
  imports: [UserModule, SequelizeModule.forRoot(dataBaseConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}