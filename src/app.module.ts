/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Events } from './events/event.entity';
import { EventsModule } from './events/event.module';
import { ProjectUser } from './project-users/project-user.entity';
import { ProjectUserModule } from './project-users/project-user.module';
import { Project } from './projects/project.entity';
import { ProjectModule } from './projects/project.module';
import { User } from './users/user.entity';
import { UserModule } from './users/user.module';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User, Project, ProjectUser, Events],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    ProjectModule,
    ProjectUserModule,
    EventsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
