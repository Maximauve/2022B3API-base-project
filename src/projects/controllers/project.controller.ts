import { Body, Controller, ForbiddenException, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/jwt-auth.guards";
import { ProjectUserService } from "../../project-users/services/project-user.service";
import { UserService } from "../../users/services/user.service";
import { CreateProjectDto } from "../dto/create-project.dto";
import { ProjectService } from "../services/project.service";

@Controller('projects')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly userService: UserService,
    private readonly projectUserService: ProjectUserService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async GetAll(@Req() req) {
    const me = await this.userService.FindOneByUsername(req.user.username);
    if (me.role === "Employee") {
      const myProjectUsers = await this.projectUserService.GetAllByEmployeeId(me.id);
      const promise = myProjectUsers.map(async pu => await this.projectService.FindOneById(pu.projectId));
      const myProjects = await Promise.all(promise);
      return myProjects;
    }
    return await this.projectService.GetAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(ValidationPipe)
  async Create(@Req() req, @Body() body: CreateProjectDto) {

    const me = await this.userService.FindOneByUsername(req.user.username);
    if (me.role !== 'Admin') {
      throw new HttpException(`You must be an admin to create a project`, HttpStatus.UNAUTHORIZED);
    }

    const user = await this.userService.FindOneById(body.referringEmployeeId);
    if (user.role === "Employee") {
      throw new HttpException(`Referring Employe cannot be ${user.role}, it must be at least Project Manager`, HttpStatus.UNAUTHORIZED);
    }
    
    const project: CreateProjectDto = {
      name: body.name,
      referringEmployeeId: body.referringEmployeeId,
    }

    return this.projectService.Create(project);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async GetOneById(@Req() req, @Param('id') id: string) {
    const project = await this.projectService.FindOneById(id);
    if (!project) {
      throw new NotFoundException(`Project with id ${id} does not exists`);
    }

    const me = await this.userService.FindOneByUsername(req.user.username);
    if (me.role === "Employee") {
      const myProject = await this.projectUserService.FindOneByEmployeeIdAndProjectId(me.id, id);
      if (!myProject) {
        throw new ForbiddenException("Le jeu est nul");
      }
    }
    return project;
  }
}
