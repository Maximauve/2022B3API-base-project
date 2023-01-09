import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreatePUserDto } from "../dto/create-project-user.dto";
import { ProjectUser } from "../project-user.entity";

@Injectable()
export class ProjectUserService {
  constructor(
    @InjectRepository(ProjectUser)
    private projectUserRepository: Repository<ProjectUser>,
  ) {}

  GetAll(): Promise<ProjectUser[]> {
    return this.projectUserRepository.find();
  }

  GetAllByEmployeeId(id: string): Promise<ProjectUser[]> {
    return this.projectUserRepository.find({
      where: {
        userId: id
      }
    });
  }

  
  async Create(obj: CreatePUserDto): Promise<ProjectUser> {
    const newProjectUser = this.projectUserRepository.create(obj);
    return this.projectUserRepository.save(newProjectUser);
  }
  
  async FindOneById(id: string): Promise<ProjectUser> {
    return this.projectUserRepository.findOne({
      where: {
        id: id
      }
    }
    );
  }

  FindOneByEmployeeIdAndProjectId(userId: string, projectId: string): Promise<ProjectUser> {
    return this.projectUserRepository.findOne({
      where: {
        userId: userId,
        projectId: projectId
      }
    });
  }

}
