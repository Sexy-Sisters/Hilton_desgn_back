import { Controller, Get, Body, Put } from '@nestjs/common';
import { UpdateTopSearchedDto } from './dto/update-top-searched.dto';
import { TopSearchedService } from './top-searched.service';

@Controller('top-searched')
export class TopSearchedController {
  constructor(private readonly topSearchedService: TopSearchedService) {}

  @Get()
  findAll() {
    return this.topSearchedService.findAll();
  }

  @Put('')
  update(@Body() updateTopSearchedDto: UpdateTopSearchedDto) {
    return this.topSearchedService.update(updateTopSearchedDto);
  }
}
