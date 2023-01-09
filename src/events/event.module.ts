import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../users/user.module";
import { EventsController } from "./controllers/event.controller";
import { Events } from "./event.entity";
import { EventsService } from "./services/event.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Events]),
    forwardRef(() => UserModule),
  ],
  exports: [EventsService],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
