import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe, UnauthorizedException, Req, HttpException, HttpStatus } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/jwt-auth.guards";
import { AuthService } from "../../auth/services/auth.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { UserIdDto } from "../dto/user-id.dto";
import { UserService } from "../services/user.service";
const bcrypt = require("bcrypt");

@Controller('users')
export class UserController {
  constructor(
      private readonly UserService: UserService,
      private authService: AuthService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  GetAll(): {} {
    return this.UserService.GetAll();
  }

  @Post('/auth/sign-up')
  @UsePipes(ValidationPipe)
  SignUp(@Body() body: CreateUserDto): {} {

    let user: CreateUserDto = {
      username: body.username,
      password: bcrypt.hashSync(body.password, 10),
      email: body.email,
      role: body.role
    }
    return this.UserService.Create(user);
  }

  @Post('/auth/login')
  async Login(@Body() body) {
    const user = await this.UserService.FindOne(body.email);
    if (!user || !bcrypt.compareSync(body.password, user.password)) {
      throw new UnauthorizedException();
    }
    return this.authService.Login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async GetProfile(@Req() req) {
    return await this.UserService.FindOneByUsername(req.user.username);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @UsePipes(ValidationPipe)
  async GetOne(@Req() req) {

    try {
        const id: UserIdDto = {
          userId: req.params.id,
        }
        const user = await this.UserService.FindOneById(id.userId);
        if (!user) {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
      return user;

    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(error.message, error.getStatus());
      }
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
