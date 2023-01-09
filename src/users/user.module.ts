import { forwardRef, Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { AuthService } from "../auth/services/auth.service";
import { EventsModule } from "../events/event.module";
import { UserController } from "./controllers/user.controller";
import { UserService } from "./services/user.service";
import { User } from "./user.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),
    EventsModule,
  ],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
