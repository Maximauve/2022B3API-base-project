import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectUserModule } from "../project-users/project-user.module";
import { UserModule } from "../users/user.module";
import { ProjectController } from "./controllers/project.controller";
import { Project } from "./project.entity";
import { ProjectService } from "./services/project.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    UserModule,
    forwardRef(() => ProjectUserModule),
  ],
  exports: [ProjectService],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
