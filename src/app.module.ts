import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal : true}),
    DatabaseModule,
    AuthModule,
    ProfileModule,
    PostModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
