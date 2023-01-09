import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../../users/services/user.service";
const bcrypt = require("bcrypt");

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async ValidateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.FindOne(username);
    const match = await bcrypt.compare(password, user.password);
    if (user && match) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async Login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload, { secret: process.env.JWT_SECRET}),
    };
  }
}
