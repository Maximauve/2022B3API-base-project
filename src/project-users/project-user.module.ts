import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectModule } from "../projects/project.module";
import { UserModule } from "../users/user.module";
import { ProjectUserController } from "./controllers/project-user.controller";
import { ProjectUser } from "./project-user.entity";
import { ProjectUserService } from "./services/project-user.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectUser]),
    UserModule,
    ProjectModule,
  ],
  exports: [ProjectUserService],
  controllers: [ProjectUserController],
  providers: [ProjectUserService],
})
export class ProjectUserModule {}
