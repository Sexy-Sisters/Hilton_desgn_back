import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { EventsService } from './events.service';

@Controller()
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  async createEvent(@Body() createEventDto: CreateEventDto) {
    return await this.eventsService.createEvents(createEventDto);
  }

  @Get()
  async getEvents() {
    return await this.eventsService.getEvents();
  }

  @Get('/:id')
  async getEventDetail(@Param('id') id: string) {
    return await this.eventsService.getEventDetail(id);
  }

  @Get('/:id')
  async updateEvent(
    @Param('id') id: string,
    @Body() createEventDto: CreateEventDto,
  ) {
    return await this.eventsService.updateEvent(id, createEventDto);
  }
}
