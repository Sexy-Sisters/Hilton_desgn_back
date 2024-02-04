import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async createEvents(createEventDto: CreateEventDto) {
    return await this.eventRepository.save(createEventDto);
  }

  async getEvents() {
    return await this.eventRepository.find();
  }

  async getEventDetail(id: string) {
    const event = await this.eventRepository.findOne({ where: { id } });
    if (!event) throw new NotFoundException();
    return event;
  }

  async updateEvent(id: string, updateEventDto: CreateEventDto) {
    const event = await this.eventRepository.findOne({ where: { id } });
    if (!event) throw new NotFoundException();

    return await this.eventRepository.update(id, updateEventDto);
  }
}
