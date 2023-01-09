import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/jwt-auth.guards";
import { UserService } from "../../users/services/user.service";
import { CreateEventDto } from "../dto/create-event.dto";
import { EventsService } from "../services/event.service";

@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async GetAll() {
    return await this.eventsService.GetAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async Create(@Req() req,@Body() body: CreateEventDto) {
    const me = await this.userService.FindOneByUsername(req.user.username);
    const myEvents = await this.eventsService.GetAllByUserId(me.id);
    if (body.eventType === "RemoteWork") {
      const myRemoteWorkEvents = myEvents.filter(e => e.eventType === "RemoteWork");
      if (myRemoteWorkEvents.length == 2) {
        throw new UnauthorizedException(`You already have two Remote Work events`);
      }
    }
    myEvents.forEach(event => {
      if (event.date === body.date) {
        throw new UnauthorizedException('You already have an event on this date');
      }
    });
    return await this.eventsService.Create(body);
  }
}
