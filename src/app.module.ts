import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataBaseConfig } from './database/database.config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from "./user/user.module";
import { AuthModule } from './auth/auth.module';
import { FramesModule } from './frames/frames.module';


@Module({
  imports: [UserModule, SequelizeModule.forRoot(dataBaseConfig), AuthModule, FramesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}