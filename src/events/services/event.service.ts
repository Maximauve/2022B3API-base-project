import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateEventDto } from "../dto/create-event.dto";
import { Events } from "../event.entity";

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Events)
    private eventsRepository: Repository<Events>,
  ) {}

  GetAll(): Promise<Events[]> {
    return this.eventsRepository.find();
  }

  GetAllByUserId(id: string): Promise<Events[]> {
    return this.eventsRepository.find({
      where: {
        userId: id
      }
    });
  }

  Create(obj: CreateEventDto): Promise<Events> {
    const newEvent = this.eventsRepository.create(obj);
    return this.eventsRepository.save(newEvent);
  }

}
