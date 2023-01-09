import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProjectUser } from "../../project-users/project-user.entity";
import { CreateProjectDto } from "../dto/create-project.dto";
import { Project } from "../project.entity";

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  GetAll(): Promise<Project[]> {
    return this.projectsRepository.find();
  }

  GetAllByEmployeeId(id: string): Promise<Project[]> {
    return this.projectsRepository.find({
      where: {
        referringEmployeeId: id
      }
    });
  }

  GetAllByEmployeeIdAndProjectUsers(id: string, projectUsers: ProjectUser[]): Promise<Project[]> {
    return this.projectsRepository.find({
      where: {
        referringEmployeeId: id,
        projectUser: projectUsers
      }
    });
  }

  Create(obj: CreateProjectDto): Promise<Project> {
    const newProject = this.projectsRepository.create(obj);
    return this.projectsRepository.save(newProject);
  }

  FindOneById(id: string): Promise<Project> {
    return this.projectsRepository.findOne({
      where: {
        id: id
      }
    });
  }
}
