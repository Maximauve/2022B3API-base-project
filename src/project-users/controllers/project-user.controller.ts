import { Body, Controller, forwardRef, Get, HttpException, HttpStatus, Inject, Post, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/jwt-auth.guards";
import { ProjectService } from "../../projects/services/project.service";
import { UserService } from "../../users/services/user.service";
import { CreatePUserDto } from "../dto/create-project-user.dto";
import { ProjectUserService } from "../services/project-user.service";
import * as dayjs from 'dayjs';

@Controller('project-users')
export class ProjectUserController {
  constructor(
    private readonly projectUserService: ProjectUserService,
    private readonly projectService: ProjectService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async Create(@Req() req, @Body() body: CreatePUserDto) {
    const me = await this.userService.FindOneByUsername(req.user.username);
    if (me.role === "Employee") {
      throw new HttpException(`You must be at least a Project Manager to create a project user`, HttpStatus.UNAUTHORIZED);
    }

    const user = await this.userService.FindOneById(body.userId);
    const project = await this.projectService.FindOneById(body.projectId);
    if (!user || !project) {
      throw new HttpException(`User or Project not found`, HttpStatus.NOT_FOUND);
    }
    const projects = await this.projectUserService.GetAllByEmployeeId(user.id);
    const startDate = dayjs(body.startDate);
    const endDate = dayjs(body.endDate);
    projects.forEach(project => {
      
      if (startDate.isBetween(project.startDate, project.endDate, 'minute', '[]') || endDate.isBetween(project.startDate, project.endDate, 'minute', '[]')) {
        throw new HttpException(`You cannot have overlapping projects`, HttpStatus.CONFLICT);
      }
    });

    return this.projectUserService.Create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async GetAll(@Req() req) {
    const me = await this.userService.FindOneByUsername(req.user.username);
    if (me.role === "Employee") {
      return this.projectUserService.GetAllByEmployeeId(me.id);
    }
    return this.projectUserService.GetAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async GetOneById(@Req() req) {
    return this.projectUserService.FindOneById(req.params.id);
  }
}
